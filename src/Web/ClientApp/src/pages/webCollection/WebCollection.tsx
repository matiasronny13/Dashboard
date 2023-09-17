import { ChangeEvent, useEffect, useState } from 'react';
import ListView from '../../components/listView/ListView';
import './webCollection.scss'

type TFilter = {
  query: string;
  tagFilter: string[];
}

export class SiteInfo {
  id: string = "";
  title?: string;
  url: string = "";
  note?: string;
  tags?: number[];
}

const WebCollection = () => {
    const [siteInfoList, setSiteinfoList] = useState([])
    const [tagList, setTagList] = useState(new Map())
    const [filter, setFilter] = useState<TFilter|any>({})

    useEffect(() => { refreshListView() }, [filter])

    useEffect(() => {
      fetch("/api/tags", { method: "GET", headers: { "Accept": "application/json", "Content-Type": "application/json"}})
      .then(response => {
        if (response.status == 200) return response.json()
      })
      .then(json => {
        const map = new Map()
        json.map((i:SiteInfo) => map.set(i.id, i.title))
        setTagList(() => map)
      })
    }, [])

    const onItemDelete = async (id:string) => {
      //setSiteinfoList(prev => prev.filter((x) => x.id !== id))
      const response = await fetch(`/api/collection?id=${id}`, { method: "DELETE", headers: { "Accept": "application/json" }})
      if(response.status == 200)      
      {          
        refreshListView()
      }
    }

    const refreshListView = () => {
      fetch("/api/collection/find", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json"}, body: JSON.stringify(filter)})
        .then(response => {
          if (response.status == 200) return response.json()
        })
        .then(json => setSiteinfoList(() => json.results))
    }

    const onFilterChange = (event:ChangeEvent<HTMLInputElement>) => {
      setFilter((prev:TFilter) => ({...prev, query: event.target.value}))
    }

    return (
      <div className="webCollection">
        <div className='tagSelector'>
          <input placeholder='Enter keyword' onChange={onFilterChange} value={filter.query}></input>
          {
            [...tagList].map((item) => (<div>{item[0] + ' - ' + item[1]}</div>))
          }
        </div>
        <ListView itemList={siteInfoList} tagList={tagList} onItemDelete={onItemDelete}></ListView>
      </div>
    );
  };
  
  export default WebCollection;
  