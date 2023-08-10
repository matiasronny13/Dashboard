import SearchBar from "../../components/searchBar/SearchBar";
import TopBox from "../../components/topBox/TopBox";
import "./startup.scss";

const Startup = () => {
  return (
    <div className="startup">
      <div className="box searchBox">
        <SearchBar />
      </div>
      <div className="box bookmarkBox">
        <TopBox />
      </div>
    </div>
  );
};

export default Startup;