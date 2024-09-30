import { ChangeEvent, useEffect, useState } from 'react';
import ListView from '../../components/listView/ListView';
import './webCollection.scss'
import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import TagItem from '../../components/tagItem/TagItem';
import { TextField } from '@mui/material';
import { Runtime } from 'chrome-types';

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
    const [filter, setFilter] = useState<TFilter|any>({ isSingle: true, tagFilter: []})

    useEffect(() => { refreshListView() }, [filter])

    useEffect(() => {
      fetchTags()
    }, [])

    const fetchTags = () => {
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
    }

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
        const selectedIds = filter.isSingle ? [id] : [...filter.tagFilter, id]
        setFilter((prev:TFilter) => ({...prev, tagFilter: selectedIds}))
      }
      else 
      {
        setFilter((prev:TFilter) => ({...prev, tagFilter: filter.tagFilter.filter((i:number) => i != id)}))
      }
    }

    const onClearAll = () => {
      setFilter((x:TFilter) => ({...x, tagFilter: []}))
    }

    const onSelectAll = () => {
      setFilter((x:TFilter) => ({...x, tagFilter: [...tagList.keys()]}))
    }

    const onSingleToggle = (event: CheckboxChangeEvent) => {
      setFilter((x:TFilter) => ({...x, 
                                tagFilter: event.target.checked ? [] : [...filter.tagFilter], 
                                isSingle:event.target.checked}))
    }

    const resetExtensionState = () => {
      if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage("pebphngoiaghbmhhipdkacbeflddpacb", { command : 'reset-state'});
      }
    }

    const onDeleteTag = async(id: number) => {
      const response = await fetch(`/api/tags/${id}`, { method: "DELETE", headers: { "Accept": "application/json" }})
      if(response.status == 200)      
      {
        tagList.delete(id)
        setFilter((prev:TFilter) => ({...prev, tagFilter: []}))  
        resetExtensionState()
      }
    }

    const onAddTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newTag = (event.target as HTMLInputElement).value.trim();
        if (newTag) {
          fetch("/api/tags", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json"}, body: JSON.stringify({title: newTag})})
          .then(response => {
            if (response.status == 201) return response.json()
          })
          .then(json => {
            setTagList(new Map(tagList).set(json.id, json.title))
            setFilter((prev:TFilter) => ({...prev, tagFilter: [json.id]}))  
            resetExtensionState()            
          })
        }
        (event.target as HTMLInputElement).value = ""
      }
    }

    return (
      <div className="webCollection">
        <div className='filterPanel'>
          <input className='queryInput' placeholder='Enter keyword' onChange={onFilterChange} value={filter.query}></input>
          <div className='tagOption'>
            <div>
              <Button onClick={onSelectAll}>Select All</Button>
              <Button onClick={onClearAll}>Clear All</Button>
            </div>
            <div><Checkbox style={{color: 'white'}} onChange={onSingleToggle} checked={filter.isSingle}>Single Select</Checkbox></div>
          </div>
          <TextField placeholder='Add Tag' variant="outlined" size="small" onKeyDown={onAddTagKeyDown} />
          {
            [...tagList].map((item) => (<TagItem id={item[0]} title={item[1]} isSelected={filter.tagFilter.indexOf(item[0]) != -1} onDeleteHandler={onDeleteTag} onClickHandler={() => toggleFilter(item[0])} />))
          }
        </div>
        <div className='listView'>
          <ListView itemList={siteInfoList} tagList={tagList} onItemDelete={onItemDelete}></ListView>
        </div>
      </div>
    );
  };
  
  export default WebCollection;
  