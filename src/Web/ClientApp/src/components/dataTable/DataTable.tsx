import {
  DataGrid,
  GridColDef,
  GridRowModes,
  GridRowModesModel
} from "@mui/x-data-grid";
import "./dataTable.scss";
import CustomGridToolbar from "./CustomGridToolbar";
import { useEffect, useState } from "react";
import { TBookmarkItem } from "../bookmark/bookmarkReducer";

type TProps = {
  columns: GridColDef[];
  rows: TBookmarkItem[];
  onCloseClickHandler: () => void;
  onSaveHandler: (items:TBookmarkItem[]) => void;
};

const DataTable = (props: TProps) => {
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
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const onApplyClickHandler = () => {
    props.onSaveHandler(localRows);
  }
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={localRows}
        editMode="row"
        rowHeight={40}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        columns={[...props.columns, actionColumn]}
        processRowUpdate={processRowUpdate}
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
