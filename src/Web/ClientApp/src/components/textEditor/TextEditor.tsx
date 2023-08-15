import { ChangeEvent, useState } from 'react';
import './textEditor.scss'
import Box from '../../components/box/Box';

export interface ITextEditorProps {
    id: number;
    title: string;
    content: string;
}

class ComponentState {
    isReadonly?: boolean;
    title?: string;
    content?: string;

    constructor(title:string, content:string)
    {
        this.title = title;
        this.content = content;
        this.isReadonly = true;
    }
}

const TextEditor = (props: ITextEditorProps) => {
    const [editorState, setEditorState] = useState<ComponentState>(new ComponentState(props.title, props.content));

    const onTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {        
        setEditorState(x => ({...x, content: event.target.value }));
    }

    const saveHandler =()=> {
        localStorage.setItem(editorState.title ?? "", editorState.content ?? "");
    }

    const cancelHandler =()=> {
        setEditorState(x => ({...x, content: props.content }));
    }

    return (
        <div className='textEditor'>
            <Box noteTitle={editorState.title}
                 editComponent={<textarea title="note" value={editorState?.content} onChange={onTextChange}></textarea>} 
                 viewComponent={<div>{editorState.content}</div>} 
                 onSaveCallback={saveHandler} onCancelCallback={cancelHandler}/>
        </div>
    );
}

export default TextEditor;