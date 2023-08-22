import useBookmark from './BookmarkContext';
import './bookmarkEditor.scss'
import DataTable from '../dataTable/DataTable';
import { GridColDef } from "@mui/x-data-grid";
import { Button } from '@mui/material';

const BookmarkEditor = () => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID" },
        {
          field: "icon",
          headerName: "Icon",
          width: 100,
          renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt="" />;
          },
        },
        {
          field: "name",
          type: "string",
          headerName: "Name",
          width: 250,
          editable: true
        },
        {
          field: "url",
          type: "string",
          headerName: "url",
          width: 150, 
          editable: true
        }
      ];

    const {items, setEditMode, populateItems} = useBookmark();
    return (
        <div className='bookmarkEditor'>
            <div className='overlay' onClick={() => {setEditMode(false)}} />
            <div className='dialog'>
                <DataTable slug="" columns={columns} rows={items}></DataTable>
                <div>
                    <Button onClick={() => {populateItems(items); setEditMode(false)}}>Apply</Button>
                    <Button onClick={() => {setEditMode(false)}}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default BookmarkEditor;