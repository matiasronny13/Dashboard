import BookmarkBox from "../../components/bookmarkBox/BookmarkBox";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="box-1">
        <BookmarkBox />
      </div>
      <TextEditor data={{ value: 'wawax' }}/>
    </div>
  );
};

export default Home;
