import BookmarkBox from "../../components/bookmarkBox/BookmarkBox";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="box">
        <BookmarkBox />
      </div>
      <div className="box">
        <TextEditor />
      </div>
    </div>
  );
};

export default Home;
