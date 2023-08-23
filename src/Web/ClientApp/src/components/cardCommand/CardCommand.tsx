import { MouseEventHandler, useState } from 'react';
import './cardCommand.scss'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from "@mui/material";

type TProps = {
    cardTitle: string;
    isEdit: boolean;
    onSaveHandler?: () => void;
    onCancelHandler?: () => void;
    onEditHandler?: () => void;
}

const CardCommand = ({cardTitle, isEdit, onSaveHandler, onCancelHandler, onEditHandler}:TProps) => {
    
    // handle search engines menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick: MouseEventHandler<HTMLImageElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="cardCommand">
            <div className='title'>{cardTitle}</div>
            <div className='commands'>
                {isEdit && <img alt="" src="/bx-check.svg" onClick={onSaveHandler}></img>}
                {isEdit && <img alt="" src="/bx-x.svg" onClick={onCancelHandler}></img>}
                {!isEdit && <img alt="" src="/bxs-edit.svg" onClick={onEditHandler}></img>}
                <img alt="" src="/bx-cog.svg" onClick={handleClick}></img>
                <Menu id="engine-menu" 
                        anchorEl={anchorEl} open={open} onClose={() => { handleClose(); }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>          
                    <MenuItem onClick={() => { handleClose(); }}>
                        <ListItemIcon>
                            <img className="searchEngineIcon" src="/bx-cog.svg" alt="" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default CardCommand;