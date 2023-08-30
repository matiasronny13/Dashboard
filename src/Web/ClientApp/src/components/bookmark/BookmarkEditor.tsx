import useBookmark from './BookmarkContext';
import './bookmarkEditor.scss'
import DataTable from '../dataTable/DataTable';
import { GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { TBookmarkItem } from './bookmarkReducer';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import DownloadDialog from './DownloadDialog';
import { useMutation } from '@tanstack/react-query';
import { Alert } from '@mui/material';

type TDownloadDialogResult = {item: TBookmarkItem, data: FormData};

const BookmarkEditor = () => {
  const gridApiRef = useGridApiRef();
  const [pageError, setPageError] = useState({isError: false, message: ""});
  const {items, storageKey, setEditMode, setItems} = useBookmark();
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const mutation = useMutation({
    mutationFn: ({item, data}:TDownloadDialogResult) => {
      setPageError(x => ({...x, isError:false}));
      return fetch("/api/bookmark/favicon/download", 
      {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"url": data.get('url'), "fileName": data.get('fileName')})
      })
      .then(response => {
        if (!response.ok) { throw new Error("/api/bookmark/favicon/download"); }        
      }) 
    },
    onSuccess: (data, variables) => {      
      gridApiRef.current.setEditCellValue({
        id: variables.item.id,
        field: 'icon',
        value: `/bookmark/${variables.data.get('fileName')}`,
      });
    },
    onError: (error, variables) => {
      setPageError(x => ({...x, isError:true, message: `fail to download favicon from ${variables.data.get('url')}`}));
    }
  })

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 50 },
    {
      field: "icon",
      headerName: "Icon",
      width: 170,
      editable: true,
      renderCell: (params) => {
        return <><img src={params.row.icon || "/noavatar.png"} alt="" /></>
      },
      renderEditCell: (params) => {
        return <>
          <img className='icon' src={params.row.icon || "/noavatar.png"} alt="" onClick={handleClick}/>
          <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
            <DownloadDialog data={params.row} onClose={handleClose} onSubmit={(data) => mutation.mutate({item: params.row, data: data})}/>
          </Popover>
        </>
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
              {pageError.isError && <Alert severity="error" onClose={() => setPageError(x => ({...x, isError:false}))}>{pageError.message}</Alert>}
              <DataTable gridApiRef={gridApiRef} columns={columns} rows={items} onCloseClickHandler={() => setEditMode(false)} onSaveHandler={onSaveHandler}></DataTable>
          </div>
      </div>
  );
}

export default BookmarkEditor;