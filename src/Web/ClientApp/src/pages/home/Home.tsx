import BookmarkBox from "../../components/bookmarkBox/BookmarkBox";
import Box from '../../components/box/Box';
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="box-1">
        <BookmarkBox />
      </div>
      <Box childComponent={<TextEditor/>}/>
    </div>
  );
};

export default Home;
