import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel
} from "@mui/x-data-grid";
import "./dataTable.scss";
import CustomGridToolbar from "./CustomGridToolbar";
import { MutableRefObject, useEffect, useState } from "react";
import { TBookmarkItem } from "../bookmark/bookmarkReducer";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { styled } from "@mui/material";

type TProps = {
  columns: GridColDef[];
  rows: TBookmarkItem[];
  gridApiRef: MutableRefObject<GridApiCommunity>;
  onCloseClickHandler: () => void;
  onSaveHandler: (items:TBookmarkItem[]) => void;
};

const StyledDataGrid = styled(DataGrid)(() => ({
    '& .MuiDataGrid-cell': {
        padding: "0px 1px"
    },
    '& .MuiDataGrid-cell--editing': {
        '& .MuiInputBase-input': {
            padding: "0px"
        },
        '& .icon': {
            cursor: "pointer"
        }
    }
}));

const DataTable = (props: TProps) => {
  const [lastEditedId, setLastEditedId] = useState<GridRowId>();
  const [localRows, setlocalRows] = useState<TBookmarkItem[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    setlocalRows(() => props.rows);
  },[]);

  const processRowUpdate = (newRow: TBookmarkItem) => {
    setlocalRows(localRows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  const handleDelete = (id: number) => {
    setlocalRows((x) => x.filter(i => i.id != id));
  };

  const onAddClickHandler = () => {
    const id = localRows.length == 0 ? 1 : Math.max(...localRows.map(a => a.id)) + 1;
    const newRow = { id, name:"", icon:"", url:"" } as TBookmarkItem;
    setlocalRows((oldRows) => [...oldRows, newRow]);
    setLastEditedId(() => id);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const onApplyClickHandler = () => {
    let tempResult = localRows;
    if(lastEditedId)
    {
      if(props.gridApiRef.current.getRowMode(lastEditedId ?? -1) == GridRowModes.Edit)
      {
        const updatedValue = props.gridApiRef.current.getRowWithUpdatedValues(lastEditedId, "");  
        tempResult = localRows.map((row) => (row.id === updatedValue.id ? updatedValue : row)) as TBookmarkItem[];
      }
    }
    props.onSaveHandler(tempResult);
  };

  const onRowEditStart: DataGridProps['onRowEditStart'] = (params) => {
    setLastEditedId(() => params.id);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/dashboard/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
    <StyledDataGrid
        apiRef={props.gridApiRef}
        className="dataGrid"
        rows={localRows}
        columns={[...props.columns, actionColumn]}
        editMode="row"
        rowHeight={40}        
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={(updatedRow) => processRowUpdate(updatedRow as TBookmarkItem)}
        onRowEditStart={onRowEditStart}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        slots={{ toolbar: CustomGridToolbar }}
        slotProps={{
          toolbar: {
            setRows: setlocalRows,
            onCloseClickHandler: props.onCloseClickHandler,
            onAddClickHandler: onAddClickHandler,
            onApplyClickHandler: onApplyClickHandler
          },
        }}
        pageSizeOptions={[15]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
