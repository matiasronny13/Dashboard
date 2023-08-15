import { useState } from "react";
import BookmarkBox from "../../components/bookmarkBox/BookmarkBox";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";

const Home = () => {

  const [state] = useState({ notes: [
    {id: 1, title: "first note", content: "first content"},
    {id: 2, title: "second note", content: "second content"}
  ] })

  return (
    <div className="home">
      <BookmarkBox />
      {state.notes.map((item) => <TextEditor key={item.id} {...item}/>)}      
    </div>
  );
};

export default Home;
