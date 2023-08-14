import { useState } from 'react';
import './box.scss'

interface Props {
    childComponent?: React.ReactNode;
}

const Box = (props: Props) => {
    const [commandState, setCommandState] = useState({ saveVisible: false, cancelVisible: false, editVisible: true });

    const onEditClick = () => {
        setCommandState({'saveVisible': true, 'cancelVisible': true, 'editVisible': false})
    }

    const onSaveClick = () => {
        setCommandState({'saveVisible': false, 'cancelVisible': false, 'editVisible': true});
    }

    const onCancelClick = () => {
        setCommandState({'saveVisible': false, 'cancelVisible': false, 'editVisible': true});
    }

    return (
        <div className="box">
            <div className="boxHeader">
                <div className='title'>Group Title</div>
                <div className='commands'>
                    {commandState.saveVisible && <img alt="" src="/bx-check.svg" onClick={onSaveClick}></img>}
                    {commandState.cancelVisible && <img alt="" src="/bx-x.svg" onClick={onCancelClick}></img>}
                    {commandState.editVisible && <img alt="" src="/bxs-edit.svg" onClick={onEditClick}></img>}
                    <img alt="" src="/bx-cog.svg"></img>
                </div>
            </div>
            <div className="content">
                {props.childComponent}
            </div>
        </div>
    );
}

export default Box;