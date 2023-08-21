import CardCommand from "../cardCommand/CardCommand";
import "./bookmark.scss"
import { useEffect } from "react"
import useBookmark from "./BookmarkContext";

type TProps = {
  storageKey: string;
}

const Bookmark = ({storageKey}:TProps) => {  
  const {items, isEdit, populateItems, setEditMode } = useBookmark();

  useEffect(() => {
    resetState();
  }, []);  

  const resetState = () => {
    const data = localStorage.getItem(storageKey);
    if (data)
    {
      populateItems(JSON.parse(data));
    }
  };

  const onSaveHandler = () => { 
    localStorage.setItem(storageKey, JSON.stringify(items));
    setEditMode(false) 
  };

  const onCancelHandler = () => { 
    resetState();
    setEditMode(false) 
  };

  const onEditHandler = () => { setEditMode(true) };

  return (
      <div className="bookmark">
        <CardCommand cardTitle="Bookmark" isEdit={isEdit} onEditHandler={onEditHandler} onCancelHandler={onCancelHandler} onSaveHandler={onSaveHandler} />
        <div className="content">
          {!isEdit && items.map(item=>(item.url) ? (
            <a className="listItem" key={item.id} href={item.url} target="_blank">
              <img className="icon" src={item.icon} alt="" />
              <span title={item.name} className="itemName">{item.name}</span>
            </a>
          ) : <div className="emptyItem"></div>)}
        </div>
      </div>
  )
};

export default Bookmark;