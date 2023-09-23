import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <Link to={`/webcollection`}>Web Collection</Link>
        <Link to={`/stockAlert`}>Stock Alerts</Link>
      </div>
      <div className="middle"><SearchBar /></div>
      <div className="right">
        <img src={`${import.meta.env.BASE_URL}/app.svg`} alt="" className="icon hide-on-mobile" />
        <div className="notification hide-on-mobile">
          <img src={`${import.meta.env.BASE_URL}/notifications.svg`} alt="" className="icon"/>
          <span className="icon">0</span>
        </div>
        <img src={`${import.meta.env.BASE_URL}/profile.svg`} alt="" className="icon hide-on-mobile" />
        <img src={`${import.meta.env.BASE_URL}/settings.svg`} alt="" className="icon hide-on-mobile" />
      </div>
    </div>
  );
};

export default Navbar;
