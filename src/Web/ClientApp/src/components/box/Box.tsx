import { useState } from 'react';
import './box.scss'

interface Props {
    editComponent?: React.ReactNode;
    viewComponent?: React.ReactNode;
}

const Box = (props: Props) => {
    const [boxState, setboxState] = useState({ isEditable: false });

    const onEditClick = () => {
        setboxState({'isEditable': true})
    }

    const onSaveClick = () => {
        setboxState({'isEditable': false})
    }

    const onCancelClick = () => {
        setboxState({'isEditable': false})
    }

    return (
        <div className="box">
            <div className="boxHeader">
                <div className='title'>Group Title</div>
                <div className='commands'>
                    {boxState.isEditable && <img alt="" src="/bx-check.svg" onClick={onSaveClick}></img>}
                    {boxState.isEditable && <img alt="" src="/bx-x.svg" onClick={onCancelClick}></img>}
                    {!boxState.isEditable && <img alt="" src="/bxs-edit.svg" onClick={onEditClick}></img>}
                    <img alt="" src="/bx-cog.svg"></img>
                </div>
            </div>
            <div className="content">
                {boxState.isEditable ? props.editComponent : props.viewComponent}
            </div>
        </div>
    );
}

export default Box;