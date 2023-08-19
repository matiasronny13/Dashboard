import Bookmark from "../../components/bookmark/Bookmark";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="card">
        <Bookmark storageKey="bookmark"/>
      </div>
      <div className="card">
        <TextEditor storageKey="note1"/>
      </div>
    </div>
  );
};

export default Home;
