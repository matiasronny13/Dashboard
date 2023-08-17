import "./bookmarkBox.scss"
import { forwardRef, useState, useEffect } from "react"

interface IBookmarkBoxProps{
  storageKey: string;
  isEditable?: boolean;
}

interface IBookmark {
  id: number;
  icon: string;
  name: string;
  url: string;
}

const BookmarkBox = forwardRef(({storageKey, isEditable}:IBookmarkBoxProps, ref) => {
  const [bookmarkState, setBookmarkState] = useState<IBookmark[]>([]);

  const getData =()=>{
      const data = localStorage.getItem(storageKey);
      setBookmarkState(data ? JSON.parse(data) : []);
  }

  useEffect(() => {
      getData();
  }, []);
  
  return (
    <div className="bookmarkBox">
      {!isEditable && bookmarkState.map(item=>(
        <a className="listItem" key={item.id} href={item.url} target="_blank">
          <img className="icon" src={item.icon} alt="" />
          <span title={item.name} className="itemName">{item.name}</span>
        </a>
      ))}
    </div>
  )
});

export default BookmarkBox