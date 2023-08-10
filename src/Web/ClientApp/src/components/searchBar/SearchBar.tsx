import "./searchBar.scss";
import {useRef, useState, MouseEvent, useEffect} from 'react'
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
  const [currentSearchEngine, setCurrentSearchEngine] = useState<searchEngineType>({});
  useEffect(() => {
    const current:searchEngineType = searchEngines.filter(item => item.isDefault == true)[0];
    setCurrentSearchEngine(current);
    return () => {
      
    };
  }, []); 

  const searchQuery = useRef(null);
  const onSearchClick = () => {
    const queryString = searchQuery.current.value;
    if (queryString !== "")
    {
      window.open(currentSearchEngine.url + queryString);
    }
  }

  const onSearchKeyDown = (event) => {
    event.stopPropagation();
    if (event.key == "Enter") onSearchClick();
    console.log(event.key);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item:searchEngineType) => {
    setCurrentSearchEngine(item);
    setAnchorEl(null);
  };

  return (
    <div className="searchBar">
      <div className="engineSelector">
        <img className="searchEngineIcon" src={currentSearchEngine.icon} alt="" onClick={handleClick}></img>
      </div>
      <input type="text" ref={searchQuery} onKeyDown={onSearchKeyDown}/>
      <img src="search.png" alt="" onClick={onSearchClick}></img>

      <Menu id="engine-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>          
      {
        searchEngines.map(item => (
          <MenuItem onClick={() => { handleClose(item); }}>
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