import { ChangeEvent, useState } from 'react';
import './textEditor.scss'
import Box from '../../components/box/Box';

export interface ITextEditorProps {
    data: object
}

class ComponentState {
    isReadonly?: boolean;
    content?: object;

    constructor(content:object)
    {
        this.content = content;
        this.isReadonly = true;
    }
}

const TextEditor = (props: ITextEditorProps) => {
    const [editorState, setEditorState] = useState<ComponentState>(new ComponentState(props.data));

    const onTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {        
        setEditorState(x => ({...x, content: { value: event.target.value }}));
    }

    return (
        <div className='textEditor'>
            <Box editComponent={<textarea title="note" value={editorState?.content?.value} onChange={onTextChange}></textarea>} viewComponent={<div>{editorState?.content?.value}</div>} />
        </div>
    );
}

export default TextEditor;