import { useState } from "react";
import BookmarkBox from "../../components/bookmarkBox/BookmarkBox";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";
import Box from "../../components/box/Box";

const Home = () => {

  const [state] = useState({ notes: [
    {id: 1, title: "first note", content: "# HEADING\na|b\n--|--\nd|d\n* first content\n* dfff"},
    {id: 2, title: "second note", content: "second content"}
  ] })

  return (
    <div className="home">
      <Box boxTitle="Bookmark">
        <BookmarkBox />
      </Box>
      {state.notes.map((item) => 
        <Box key={item.id} boxTitle={item.title}>
          <TextEditor content={item.content} id={item.id}/>
        </Box>
      )}
    </div>
  );
};

export default Home;
