import "./bookmarkBox.scss"
import {bookmarkData} from "../../data.ts"
import Box from '../../components/box/Box';

const BookmarkBox = () => {
  return (
    <div className="bookmarkBox">
      <Box noteTitle="Bookmarks"
          viewComponent={
            <>
              {bookmarkData.map(item=>(
                <a className="listItem" key={item.id} href={item.url} target="_blank">
                  <img className="icon" src={item.icon} alt="" />
                  <span title={item.name} className="itemName">{item.name}</span>
                </a>
              ))}
            </>
          }/>
    </div>
  )
}

export default BookmarkBox