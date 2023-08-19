import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './textEditor.scss'
import { marked } from 'marked';
import CardCommand from '../cardCommand/CardCommand';

type TProps = {
    storageKey: string;
    isEditable?: boolean;
}

const TextEditor = forwardRef(({storageKey, isEditable}:TProps, ref) => {
    useImperativeHandle(ref, () => {
        return {
            cancelChange: () => {
                getData();
            },
            saveChange: () => {
                localStorage.setItem(storageKey, JSON.stringify(editorState));
            }
        };
    });
    
    const [editorState, setEditorState] = useState({content: ""});
    const viewRef = useRef<HTMLDivElement>(null);
    const onTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {        
        setEditorState({...editorState, content: event.target.value});
    }

    const getData =()=>{
        const data = localStorage.getItem(storageKey);
        setEditorState(data ? JSON.parse(data) : {content: ""});
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if(!isEditable && viewRef.current)
        {
            viewRef.current.innerHTML = marked.parse(editorState.content);
        }
    },[isEditable, editorState.content]);

    
    return (
        <div className='textEditor'>
            <CardCommand boxTitle="Notes" />
            <div className="content">
                {isEditable && <div className='editorDiv'><textarea title="note" value={editorState.content} onChange={onTextChange}></textarea></div>} 
                {!isEditable &&<div className='viewerDiv' ref={viewRef}></div>} 
            </div>
        </div>
    );
});

export default TextEditor;