import { ChangeEvent, useEffect, useState } from 'react';
import ListView from '../../components/listView/ListView';
import './webCollection.scss'
import { Link } from 'react-router-dom';

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
    const [filter, setFilter] = useState<TFilter|any>({ tagFilter: []})

    useEffect(() => { refreshListView() }, [filter])

    useEffect(() => {
      fetch("/api/tags", { method: "GET", headers: { "Accept": "application/json", "Content-Type": "application/json"}})
      .then(response => {
        if (response.status == 200) return response.json()
      })
      .then(json => {
        const tagMap = new Map()
        json = json.sort((a: { title: string; }, b: { title: string; }) => a.title > b.title ? 1 : -1)
        json.map((i:SiteInfo) => tagMap.set(i.id, i.title))
        setTagList(() => tagMap)
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

    const toggleFilter = (id:number) => {
      if(filter.tagFilter.indexOf(id) == -1)
      {
        setFilter((prev:TFilter) => ({...prev, tagFilter: [...filter.tagFilter, id]}))
      }
      else 
      {
        setFilter((prev:TFilter) => ({...prev, tagFilter: filter.tagFilter.filter((i:number) => i != id)}))
      }
    }

    return (
      <div className="webCollection">
        <div className='filterPanel'>
          <Link style={{padding: "15px 5px"}} to="..">
            <img title='home' src="./home.svg"></img>
          </Link>
          <input className='queryInput' placeholder='Enter keyword' onChange={onFilterChange} value={filter.query}></input>
          {
            [...tagList].map((item) => (<div className={`tagButton ${filter.tagFilter.indexOf(item[0]) != -1 ? 'selected' : ''}`} onClick={() => toggleFilter(item[0])}>{item[1]}</div>))
          }
        </div>
        <ListView itemList={siteInfoList} tagList={tagList} onItemDelete={onItemDelete}></ListView>
      </div>
    );
  };
  
  export default WebCollection;
  