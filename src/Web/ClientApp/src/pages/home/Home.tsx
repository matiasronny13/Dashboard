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
      <div className="card2">
        <img title="hiragana" src="/dashboard/Hiragana.png" />
      </div>
      <div className="card">
        <TextEditor storageKey="note1"/>
      </div>
    </div>
  );
};

export default Home;
