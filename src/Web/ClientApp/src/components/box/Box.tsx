import { MouseEventHandler, MutableRefObject, ReactElement, cloneElement, useRef, useState } from 'react';
import './box.scss'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from "@mui/material";

interface IBoxChildren {
    saveChange: () => object;
    cancelChange: () => object;
}

interface IBoxProps {
    boxTitle: string;
    children: ReactElement<{ isEditable: boolean; ref: MutableRefObject<IBoxChildren | undefined>; }>;
}

const Box = ({boxTitle, children}:IBoxProps) => {
    const [boxState, setboxState] = useState({ isEditable: false });
    const childrenRef = useRef<IBoxChildren>();

    const onEditClick = () => {
        setboxState({'isEditable': true})
    }

    const onSaveClick = () => {
        setboxState({'isEditable': false});
        (childrenRef.current) && childrenRef.current.saveChange();
    }

    const onCancelClick = () => {
        setboxState({'isEditable': false});
        (childrenRef?.current) && childrenRef.current.cancelChange();        
    }

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
        <div className="box">
            <div className="boxHeader">
                <div className='title'>{boxTitle}</div>
                <div className='commands'>
                    {boxState.isEditable && <img alt="" src="/bx-check.svg" onClick={onSaveClick}></img>}
                    {boxState.isEditable && <img alt="" src="/bx-x.svg" onClick={onCancelClick}></img>}
                    {!boxState.isEditable && <img alt="" src="/bxs-edit.svg" onClick={onEditClick}></img>}
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
            <>
                {cloneElement(children, {isEditable: boxState.isEditable, ref:childrenRef})}
            </>
        </div>
    );
}

export default Box;