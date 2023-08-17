import BookmarkBox from "../../components/bookmarkBox/BookmarkBox";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";
import Box from "../../components/box/Box";

const Home = () => {
  return (
    <div className="home">
      <Box boxTitle="Bookmark">
        <BookmarkBox />
      </Box>
      <Box boxTitle="Notes">
        <TextEditor storageKey="note1"/>
      </Box>
    </div>
  );
};

export default Home;
