import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './textEditor.scss'

interface ITextEditorProps{
    content: string;
    id: number;
    isEditable?: boolean;
}

const TextEditor = forwardRef(({content, id, isEditable}:ITextEditorProps, ref) => {
    useImperativeHandle(ref, () => {
        return {
            cancelChange: () => {
                setEditorContent(content);
            },
            saveChange: () => {
                localStorage.setItem(id.toString(), editorContent ?? "");
            }
        };
    });
    
    const [editorContent, setEditorContent] = useState(content);
    const viewRef = useRef<HTMLDivElement>(null);
    const onTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {        
        setEditorContent(event.target.value);
    }

    useEffect(() => {
        if(!isEditable && viewRef.current)
        {
            viewRef.current.innerHTML = "<b style='color:red'>" + editorContent + "</b>"
        }
    },[isEditable, editorContent]);

    
    return (
        <div className='textEditor'>
            {isEditable && <textarea title="note" value={editorContent} onChange={onTextChange}></textarea>} 
            {!isEditable &&<div ref={viewRef}></div>} 
        </div>
    );
});

export default TextEditor;