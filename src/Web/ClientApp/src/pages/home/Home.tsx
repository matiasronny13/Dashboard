import Bookmark from "../../components/bookmark/Bookmark";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";
import { BookmarkProvider } from "../../components/bookmark/BookmarkContext";

const Home = () => {
  return (
    <div className="home">
      <div className="card">
        <BookmarkProvider>
          <Bookmark storageKey="bookmark"/>
        </BookmarkProvider>
      </div>
      <div></div>
      <div className="card">
        <TextEditor storageKey="note1"/>
      </div>      
      <div></div>
      <div></div>      
      <div className="card">
        <TextEditor storageKey="note2"/>
      </div>     
    </div>
  );
};

export default Home;
