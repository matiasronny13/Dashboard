import "./stockAlert.scss";
import { Typography, notification } from "antd";
import { Fragment, useEffect, useState } from "react";
import { PostgrestResponse, createClient } from "@supabase/supabase-js";
import { supabaseSettings } from "../../supabase.local";

const supabase = createClient(supabaseSettings.url, supabaseSettings.secret);

enum RowStatus {
  New,
  Modified,
  Deleted
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

type TAlert = {
  id: number;
  symbol: string;
  price: number;
  operator: string;
  status: RowStatus;
};

const StockAlert = () => {
  const [alerts, setAlerts] = useState<TAlert[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [errors, setErrors] = useState<string[]>([])
  const [timestamp, setTimestamp] = useState<string>("")

  useEffect(() => {
    getAlerts();
    GetTimestamp();
  }, []);

  useEffect(() => {
    if(errors.length > 0)
    {
      errors.map(e => openNotificationWithIcon('error', e))
      setErrors([])
    }
  },[errors])

  const GetTimestamp = async () => {
    const response = await supabase.from("Alerts_History").select("value").eq("id", "last_execution")
    if(response.data)
    {
      setTimestamp(() => response.data[0].value)
    }
  }

  async function getAlerts() {
    const response: PostgrestResponse<TAlert> = await supabase
      .from("Alerts")
      .select()
      .order('symbol', { ascending: true });
    setAlerts(() => response.data ?? []);
  }

  const onAddRow = () => {
    const newId = Math.max(...alerts!.map((a) => a.id)) + 1;
    const newAlert = { symbol: '', price: 0, operator: '', id: newId , status: RowStatus.New}
    setAlerts((prev) => [...prev, newAlert]);
  };

  const onDelete = (id: number) => {
    setAlerts(alerts?.map(a => a.id === id ? {...a, status: RowStatus.Deleted } : a))
  }

  const editValue = (id:number, change:any) => {
    setAlerts(alerts?.map(a => a.id == id ? {...a, status: RowStatus.Modified, ...change} : a))
  }

  const openNotificationWithIcon = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Saving failure',
      description: message
    });
  };

  const onSave = () => {
    const process:any[] = [];
    alerts?.map(async (a) => {
      if(a.status === RowStatus.New || a.status === RowStatus.Modified)
      {
        process.push(supabase.from('Alerts').upsert({id: a.id, symbol:a.symbol.toUpperCase(), operator: a.operator.toLowerCase(), price: a.price}).select())
      }
      else if(a.status === RowStatus.Deleted)
      {
        process.push(supabase.from('Alerts').delete().eq('id', a.id))
      }
    })

    Promise.all(process).then(async result => {
      let isSuccess = true
      result.map(i => {
        if (i.error)
        {
          setErrors((prev) => [...prev, i.error.message])
          isSuccess = false;
        }
      })

      if(isSuccess) 
      {
        await getAlerts()
      }
    })
  }

  const setRowColor = (status: RowStatus):string => ((status === RowStatus.New || status === RowStatus.Modified) ? "changed" : "")

  return (
    <div className="stockAlert">
      {contextHolder}
      <div className="content">
        <div className="mainContent">
          <div className="tableGrid">
              <header>Symbol</header>
              <header>Operator</header>
              <header>Price</header>
              <header></header>
            {
              alerts?.map((a) => (a.status != RowStatus.Deleted && 
              <Fragment key={a.id}>
                <div><input className={setRowColor(a.status)} title="symbol" value={a.symbol} onChange={(e) => editValue(a.id, {symbol: e.target.value})}></input></div>
                <div><input className={setRowColor(a.status)} title="operator" value={a.operator} onChange={(e) => editValue(a.id, {operator: e.target.value})}></input></div>
                <div><input className={setRowColor(a.status)} title="price" value={a.price} onChange={(e) => editValue(a.id, {price: e.target.value})}></input></div>
                <div className="rowAction"><Typography.Link onClick={() => onDelete(a.id)}>Delete</Typography.Link></div>
              </Fragment>))
            }
          </div>
          <div className="commandBar">
            <Typography.Link onClick={onAddRow}>Add</Typography.Link>
            <Typography.Link onClick={onSave}>Save</Typography.Link>
          </div>
          <div style={{paddingTop: "20px"}}>{`Last execution: ${timestamp}`}</div>
        </div>
        <div className="filler"></div>
      </div>
    </div>
  );
};

export default StockAlert;
