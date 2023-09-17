import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="./webcollection">Collection</Link>
      </div>
      <div className="middle"><SearchBar /></div>
      <div className="right">
        <img src="/dashboard/app.svg" alt="" className="icon hide-on-mobile" />
        <div className="notification hide-on-mobile">
          <img src="/dashboard/notifications.svg" alt="" className="icon"/>
          <span className="icon">0</span>
        </div>
        <img src="/dashboard/profile.svg" alt="" className="icon hide-on-mobile" />
        <img src="/dashboard/settings.svg" alt="" className="icon hide-on-mobile" />
      </div>
    </div>
  );
};

export default Navbar;
