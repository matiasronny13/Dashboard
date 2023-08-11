import "./searchBar.scss";
import {useRef, useState, KeyboardEvent, useEffect, MouseEvent } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from "@mui/material";
import { searchEngines } from '../../data'

type searchEngineType = {
  id: number,
  name: string,
  icon: string,
  url: string,
  isDefault: boolean
};

const SearchBar = () => {
  // handle states
  const [currentSearchEngine, setCurrentSearchEngine] = useState<searchEngineType|null>(null);
  useEffect(() => {
    const current:searchEngineType = searchEngines.filter(item => item.isDefault == true)[0];
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
  const onSearchKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    if (event.key == "Enter") onSearchClick();
  }

  // handle search engines menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item:searchEngineType|null) => {
    if(item != null) setCurrentSearchEngine(item);
    setAnchorEl(null);
  };

  return (
    <div className="searchBar">
      <div className="engineSelector">
        <img className="searchEngineIcon" src={currentSearchEngine?.icon} alt="" onClick={handleClick}></img>
      </div>
      <input title="search" type="text" ref={searchQuery} onKeyDown={onSearchKeyDown}/>    
      <img src="search.png" alt="" onClick={onSearchClick}></img>

      <Menu id="engine-menu" anchorEl={anchorEl} open={open} onClose={() => { handleClose(null); }}>          
      {
        searchEngines.map(item => (
          <MenuItem key={item.id} onClick={() => { handleClose(item); }}>
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