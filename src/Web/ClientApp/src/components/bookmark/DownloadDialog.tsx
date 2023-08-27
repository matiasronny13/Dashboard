import { useState } from 'react';
import './downloadDialog.scss'
import { TBookmarkItem } from './bookmarkReducer';
import { Button, Popover } from '@mui/material';

const DownloadDialog = (props: TBookmarkItem) => {
    
    const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
    <div className='downloadDialog'>
        <img id={id} className='icon' src={props.icon || "/noavatar.png"} alt="" onClick={handleClick}/>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        >
            <div className='downloadPanel'> 
                <label>File Name</label>
                <input title='FileName' type='text' defaultValue={props.icon}></input>
                <label>Url</label>
                <input title='Url' type='text' ></input>
                <div></div>
                <Button>Update</Button>
            </div>
        </Popover>
    </div>);
}

export default DownloadDialog;