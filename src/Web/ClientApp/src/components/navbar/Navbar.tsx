import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./navbar.scss";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'menu-popover' : undefined;

  return (
    <div className="navbar">
      <div className="left">
        <Link style={{padding: "15px 5px"}} to="/">
            <img title='home' src="./home.svg"></img>
        </Link>        
      </div>
      <div className="middle"><SearchBar /></div>
      <div className="right">
        <img src={`${import.meta.env.BASE_URL}/app.svg`} onClick={handleClick} alt="" className="icon hide-on-mobile" />
        <div className="notification hide-on-mobile">
          <img src={`${import.meta.env.BASE_URL}/notifications.svg`} alt="" className="icon"/>
          <span className="icon">0</span>
        </div>
        <img src={`${import.meta.env.BASE_URL}/settings.svg`} alt="" className="icon hide-on-mobile" />
      </div>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <div className="appMenu">
          <Link to="/webcollection" onClick={handleClose}>
            <img src={`${import.meta.env.BASE_URL}/web-collector.png`} alt=""></img>
            <Typography>Web collector</Typography>
          </Link>
          <Link to="/stockAlert"  onClick={handleClose}>
            <img src={`${import.meta.env.BASE_URL}/stock-alert.png`} alt=""></img>
            <Typography>Stock Alert</Typography>
          </Link>
        </div>
      </Popover>
    </div>
  );
};

export default Navbar;
