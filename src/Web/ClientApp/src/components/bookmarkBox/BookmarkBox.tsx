import "./bookmarkBox.scss"
import {bookmarkData} from "../../data.ts"

const BookmarkBox = () => {
  return (
    <div className="bookmarkBox">
      <div className="menu">
        <div>Group Title</div>
        <div>
          <span>X</span>
        </div>
      </div>
      <div className="content">
        {bookmarkData.map(item=>(
          <a className="listItem" key={item.id} href={item.url} target="_blank">
            <img loading="lazy" className="icon" src={item.icon} alt="" />
            <span title={item.name} className="itemName">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default BookmarkBox