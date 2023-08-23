import CardCommand from "../cardCommand/CardCommand";
import "./bookmark.scss"
import { useEffect } from "react"
import useBookmark from "./BookmarkContext";
import BookmarkEditor from "./BookmarkEditor";
import { initialState } from "./bookmarkReducer";

type TProps = {
  storageKey: string;
}

const Bookmark = ({storageKey}:TProps) => {  
  const {items, isEdit, initializeState, setEditMode } = useBookmark();

  useEffect(() => {
    const data = localStorage.getItem(storageKey);
    initializeState({
        ...initialState, 
        storageKey: storageKey,
        items: (data) ? JSON.parse(data) : []
    });
  }, []);  

  return (
      <div className="bookmark">
        <CardCommand cardTitle="Bookmark" isEdit={isEdit} onEditHandler={() => setEditMode(!isEdit)} />

        {isEdit && <BookmarkEditor />}

        <div className="content">
          {items.map(item=>(item.url) ? (
            <a className="listItem" key={item.id} href={item.url} target="_blank">
              <img className="icon" src={item.icon} alt="" />
              <span title={item.name} className="itemName">{item.name}</span>
            </a>
          ) 
          : <div className="emptyItem"></div>)}
        </div>
      </div>
  )
};

export default Bookmark;