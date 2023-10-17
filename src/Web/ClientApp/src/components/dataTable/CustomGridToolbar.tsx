import './customGridToolbar.scss'
import { Button } from "@mui/material";
import { GridRowsProp, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";

type CustomToolbarProps = {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    onAddClickHandler: () => void;
    onCloseClickHandler: () => void;
    onApplyClickHandler: () => void;
}

function CustomGridToolbar({ onAddClickHandler, onCloseClickHandler, onApplyClickHandler }: CustomToolbarProps) {
    return (
      <GridToolbarContainer className="gridToolbarContainer">
        <div>
            <Button onClick={onAddClickHandler}>Add</Button>
            <Button onClick={onApplyClickHandler}>Apply</Button>
            <Button onClick={onCloseClickHandler}>Cancel</Button>
            <GridToolbarExport />
        </div>
        <div>
            <GridToolbarQuickFilter debounceMs={500} />
        </div>
      </GridToolbarContainer>
    );
  }

  export default CustomGridToolbar;