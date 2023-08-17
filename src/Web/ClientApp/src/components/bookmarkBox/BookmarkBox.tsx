import "./bookmarkBox.scss"
import {bookmarkData} from "../../data.ts"
import { forwardRef } from "react"

const BookmarkBox = forwardRef(() => {
  return (
    <div className="bookmarkBox">
      {bookmarkData.map(item=>(
        <a className="listItem" key={item.id} href={item.url} target="_blank">
          <img className="icon" src={item.icon} alt="" />
          <span title={item.name} className="itemName">{item.name}</span>
        </a>
      ))}
    </div>
  )
});

export default BookmarkBox