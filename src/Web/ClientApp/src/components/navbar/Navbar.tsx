import SearchBar from "../searchBar/SearchBar";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo"></div>
      <SearchBar></SearchBar>
      <div className="icons">
        <img src="/app.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" className="icon"/>
          <span>0</span>
        </div>
        <div className="user">
          <img src="/profile.svg" alt="" className="icon" />
          <span>Joe</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
