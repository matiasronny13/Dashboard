import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './textEditor.scss'
import { marked } from 'marked';
import CardCommand from '../cardCommand/CardCommand';

type TProps = {
    storageKey: string;
}

type TEditorState = {
    content?: string|undefined;
    isEdit: boolean;
}

const TextEditor = ({storageKey}:TProps) => {
        
    const [editorState, setEditorState] = useState<TEditorState>({isEdit: false});
    const viewRef = useRef<HTMLDivElement>(null);
    const onTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {        
        setEditorState({...editorState, content: event.target.value});
    }

    const editContent = () => {
        setEditorState({...editorState, isEdit: !editorState.isEdit });
    }
    
    const cancelChange = () => {
        const content = localStorage.getItem(storageKey) ?? "";
        setEditorState({...editorState, content: content, isEdit: !editorState.isEdit });
    }

    const saveChange = () => {
        localStorage.setItem(storageKey, editorState.content ?? "");
        setEditorState({...editorState, isEdit: !editorState.isEdit });
    }

    useEffect(() => {
        if(editorState.content == undefined)
        {
            const content = localStorage.getItem(storageKey) ?? "";
            setEditorState({...editorState, content: content});
        }

        if(!editorState.isEdit && viewRef.current)
        {
            viewRef.current.innerHTML = editorState.content ? marked.parse(editorState.content) : "";
        }
    },[editorState, storageKey]);
    
    return (
        <div className='textEditor'>
            <CardCommand cardTitle="Notes" isEdit={editorState.isEdit} onSaveHandler={saveChange} onCancelHandler={cancelChange} onEditHandler={editContent} />
            <div className="content">
                {editorState.isEdit && <div className='editorDiv'><textarea title="note" value={editorState.content} onChange={onTextChange}></textarea></div>} 
                {!editorState.isEdit &&<div className='viewerDiv' ref={viewRef}></div>} 
            </div>
        </div>
    );
};

export default TextEditor;