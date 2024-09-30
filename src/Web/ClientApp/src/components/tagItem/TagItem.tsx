import { MouseEventHandler } from "react";
import './tagItem.scss'

export type TProps = {
    id: number
    title: string;
    isSelected: boolean;
    onClickHandler: MouseEventHandler<HTMLDivElement>;
    onDeleteHandler: (id: number) => void;
}

const TagItem = ({id, title, isSelected, onClickHandler, onDeleteHandler}: TProps) => {
    return <div className={`tagButton ${isSelected ? 'selected' : ''}`}>
        <span className="tagTitle" onClick={onClickHandler}>{title}</span>
        {
            isSelected && 
            <div className="tagRemove" onClick={() => onDeleteHandler(id)}>
                <img alt="Delete" title="Delete" src="/dashboard/bx-x.svg"></img>
            </div>
        }
    </div>
}

export default TagItem;