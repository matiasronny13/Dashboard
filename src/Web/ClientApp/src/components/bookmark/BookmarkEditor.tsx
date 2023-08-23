import useBookmark from './BookmarkContext';
import './bookmarkEditor.scss'
import DataTable from '../dataTable/DataTable';
import { GridColDef } from "@mui/x-data-grid";
import { TBookmarkItem } from './bookmarkReducer';

const BookmarkEditor = () => {

  const {items, storageKey, setEditMode, setItems } = useBookmark();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 50 },
    {
      field: "icon",
      headerName: "Icon",
      width: 170,
      editable: true,
      renderCell: (params) => {
        return <img src={params.row.icon || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 150,
      editable: true
    },
    {
      field: "url",
      type: "string",
      headerName: "url",
      width: 480, 
      editable: true
    }
  ];
    
  const onSaveHandler = (newItems:TBookmarkItem[]) => {
    setItems(newItems);
    localStorage.setItem(storageKey, JSON.stringify(newItems));
    setEditMode(false) 
  };

  return (
      <div className='bookmarkEditor'>
          <div className='overlay' onClick={() => setEditMode(false)} />
          <div className='dialog'>
              <DataTable columns={columns} rows={items} onCloseClickHandler={() => setEditMode(false)} onSaveHandler={onSaveHandler}></DataTable>
          </div>
      </div>
  );
}

export default BookmarkEditor;