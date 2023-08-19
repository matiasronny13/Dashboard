import CardCommand from "../cardCommand/CardCommand";
import "./bookmark.scss"
import { useState, useEffect } from "react"

type TProps = {
  storageKey: string;
  isEditable?: boolean;
}

type TBookmark = {
  id: number;
  icon: string;
  name: string;
  url: string;
}

const Bookmark = ({storageKey, isEditable}:TProps) => {
  const [bookmarkState, setBookmarkState] = useState<TBookmark[]>([]);

  const getData =()=>{
      const data = localStorage.getItem(storageKey);
      setBookmarkState(data ? JSON.parse(data) : []);
  }

  useEffect(() => {
      getData();
  }, []);
  
  return (
    <div className="bookmark">
      <CardCommand boxTitle="Bookmark" />
      <div className="content">
        {!isEditable && bookmarkState.map(item=>(
          <a className="listItem" key={item.id} href={item.url} target="_blank">
            <img className="icon" src={item.icon} alt="" />
            <span title={item.name} className="itemName">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
};

export default Bookmark;