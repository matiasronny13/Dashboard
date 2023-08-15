import { useState } from 'react';
import './box.scss'

interface IBoxProps {
    editComponent: React.ReactNode;
    viewComponent: React.ReactNode;
    noteTitle: string|undefined;
    onSaveCallback: () => void;
    onCancelCallback: () => void;    
}

const Box = ({noteTitle, editComponent, viewComponent, onSaveCallback, onCancelCallback}:IBoxProps) => {
    const [boxState, setboxState] = useState({ isEditable: false });

    const onEditClick = () => {
        setboxState({'isEditable': true})
    }

    const onSaveClick = () => {
        setboxState({'isEditable': false})
        onSaveCallback();
    }

    const onCancelClick = () => {
        setboxState({'isEditable': false})
        onCancelCallback();
    }

    return (
        <div className="box">
            <div className="boxHeader">
                <div className='title'>{noteTitle}</div>
                <div className='commands'>
                    {boxState.isEditable && <img alt="" src="/bx-check.svg" onClick={onSaveClick}></img>}
                    {boxState.isEditable && <img alt="" src="/bx-x.svg" onClick={onCancelClick}></img>}
                    {!boxState.isEditable && <img alt="" src="/bxs-edit.svg" onClick={onEditClick}></img>}
                    <img alt="" src="/bx-cog.svg"></img>
                </div>
            </div>
            <div className="content">
                {boxState.isEditable ? editComponent : viewComponent}
            </div>
        </div>
    );
}

export default Box;