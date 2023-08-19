import "./searchBar.scss";
import {useRef, useState, useEffect, MouseEventHandler, KeyboardEventHandler } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from "@mui/material";
import { searchEngines } from '../../data'

type TSearchEngineType = {
  id: number,
  name: string,
  icon: string,
  url: string,
  isDefault: boolean
};

const SearchBar = () => {
  // handle states
  const [currentSearchEngine, setCurrentSearchEngine] = useState<TSearchEngineType|null>(null);
  useEffect(() => {
    const current:TSearchEngineType = searchEngines.filter(item => item.isDefault == true)[0];
    setCurrentSearchEngine(current);
    return () => {};
  }, []); 

  // handle search events 
  const searchQuery = useRef<HTMLInputElement>(null);
  const onSearchClick = () => {
    if (searchQuery.current)
    {
      const queryString = searchQuery.current.value;
      if (queryString !== "" && currentSearchEngine)
      {
        window.open(currentSearchEngine.url + queryString);
      }
    }
  }
  const onSearchKeyDown:KeyboardEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
    if (event.key == "Enter") onSearchClick();
  }

  // handle search engines menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: MouseEventHandler<HTMLImageElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item:TSearchEngineType|null) => {
    if(item != null) setCurrentSearchEngine(item);
    setAnchorEl(null);
  };

  return (
    <div className="searchBar">
      <div className="engineSelector">
        <img className="searchEngineIcon" src={currentSearchEngine?.icon} alt="" onClick={handleClick}></img>
      </div>
      <input title="search" type="text" ref={searchQuery} onKeyDown={onSearchKeyDown}/>    
      <img src="/search/search.png" alt="" onClick={onSearchClick}></img>

      <Menu id="engine-menu" anchorEl={anchorEl} open={open} onClose={() => { handleClose(null); }}>          
      {
        searchEngines.map(item => (
          <MenuItem key={item.id} onClick={() => { handleClose(item); }} selected={(currentSearchEngine ? currentSearchEngine.id == item.id : false)}>
            <ListItemIcon>
              <img className="searchEngineIcon" src={item.icon} alt="" />
            </ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
        ))
      }
      </Menu>
    </div>
  )
}

export default SearchBar;