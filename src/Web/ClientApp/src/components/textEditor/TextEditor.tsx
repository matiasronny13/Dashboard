//import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
//import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
    return (
        <div className="textEditor">
            <Editor></Editor>
        </div>
    );
};

export default TextEditor;