import { useState } from 'react';
import './textEditor.scss'
import { TextareaAutosize } from '@mui/material';

const TextEditor = () => {
    const [editorState, setEditorState] = useState({ content: '', isReadOnly: false});

    return (
        <div className='textEditor'>
            {editorState.isReadOnly ? <div>read only</div> : <TextareaAutosize/>}
        </div>
    );
}

export default TextEditor;