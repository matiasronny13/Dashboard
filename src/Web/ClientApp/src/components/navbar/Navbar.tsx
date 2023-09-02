import SearchBar from "../searchBar/SearchBar";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left"></div>
      <div className="middle"><SearchBar /></div>
      <div className="right">
        <img src="/app.svg" alt="" className="icon hide-on-mobile" />
        <div className="notification hide-on-mobile">
          <img src="/notifications.svg" alt="" className="icon"/>
          <span className="icon">0</span>
        </div>
        <img src="/profile.svg" alt="" className="icon hide-on-mobile" />
        <img src="/settings.svg" alt="" className="icon hide-on-mobile" />
      </div>
    </div>
  );
};

export default Navbar;
