import { useState } from "react";
import BookmarkBox from "../../components/bookmarkBox/BookmarkBox";
import TextEditor from "../../components/textEditor/TextEditor";
import "./home.scss";

const Home = () => {

  const [state, setState] = useState({ notes: [
    {title: "first note", content: "first content"},
    {title: "second note", content: "second content"}
  ] })

  return (
    <div className="home">
      <div className="box-1">
        <BookmarkBox />
      </div>
      {state.notes.map((item) => <TextEditor {...item}/>)}      
    </div>
  );
};

export default Home;
