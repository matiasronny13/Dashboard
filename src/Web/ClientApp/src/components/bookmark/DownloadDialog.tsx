import { Button } from '@mui/material';
import { TBookmarkItem } from './bookmarkReducer';
import './downloadDialog.scss'

type TProps = {
    data: TBookmarkItem;
    onClose: ()=>void;
    onSubmit: (data:FormData)=>void;
}

const DownloadDialog = (props: TProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.onClose();
        props.onSubmit(new FormData(e.target as HTMLFormElement));
    };
    
    return (
        <div className='downloadDialog'> 
            <form onSubmit={handleSubmit}>
                <label>File Name</label>
                <input title='FileName' name="fileName" type='text' defaultValue={props.data.icon}></input>
                <label>Url</label>
                <input title='Url' name="url" type='text' defaultValue={(props.data.url) ? `https://www.google.com/s2/favicons?domain=${props.data.url}&sz=48` : ""}></input>
                <Button type="submit">Update</Button>
            </form> 
        </div>
    );
}

export default DownloadDialog;