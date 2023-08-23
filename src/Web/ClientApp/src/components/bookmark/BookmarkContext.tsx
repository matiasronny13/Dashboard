import { createContext, useContext, useReducer } from 'react'
import bookmarkReducer, {initialState, REDUCER_ACTION_TYPE, TBookmarkItem, TBookmarkState} from "./bookmarkReducer";

const BookmarkContext = createContext(initialState);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) =>{
    const [state, dispatch] = useReducer(bookmarkReducer, initialState);

    const addItem = (newItem:TBookmarkItem) => {
        dispatch({type:REDUCER_ACTION_TYPE.ADD_ITEM, payload:newItem});
    };

    const initializeState = (state:TBookmarkState) => dispatch({type: REDUCER_ACTION_TYPE.INITIALIZE, payload: state });

    const setItems = (items:TBookmarkItem[]) => {
        dispatch({type: REDUCER_ACTION_TYPE.POPULATE_ITEMS, payload: items });
    };

    const updateItem = (item: TBookmarkItem) => { dispatch({type: REDUCER_ACTION_TYPE.UPDATE_ITEM, payload: item}) };

    const deleteItem = (item: TBookmarkItem) => { dispatch({type: REDUCER_ACTION_TYPE.DELETE_ITEM, payload: item}) }

    const setEditMode = (mode: boolean) => { dispatch({type: REDUCER_ACTION_TYPE.SET_EDIT_MODE, payload: mode}) }

    const value = {
        items: state.items,
        isEdit: state.isEdit,
        firstCall: state.firstCall,
        storageKey: state.storageKey,
        initializeState: initializeState,
        addItem: addItem,
        updateItem: updateItem,
        deleteItem: deleteItem,
        setItems: setItems,
        setEditMode: setEditMode
    };

    return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

const useBookmark = () => {
    const context = useContext(BookmarkContext);

    if (context === undefined) {
        throw new Error("useBookmark must be used within BookmarkContext");
    }

    return context;
};
  
export default useBookmark;