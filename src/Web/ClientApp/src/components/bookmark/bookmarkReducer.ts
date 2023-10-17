export type TBookmarkItem = {
    id: number;
    icon: string;
    name: string;
    url: string;
};

export type TBookmarkState = {
    items: TBookmarkItem[];
    isEdit: boolean;
    firstCall: boolean;    
    storageKey: string;
    initializeState: (state:TBookmarkState) => void;
    addItem: (newItem:TBookmarkItem) => void;
    updateItem: (item:TBookmarkItem) => void;
    deleteItem: (item:TBookmarkItem) => void;
    setItems: (items:TBookmarkItem[]) => void;
    setEditMode: (mode: boolean) => void;
}

export enum REDUCER_ACTION_TYPE {
    INITIALIZE,
    POPULATE_ITEMS,
    ADD_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    SET_EDIT_MODE
}

export const initialState:TBookmarkState = { 
    items: [], 
    isEdit: false, 
    firstCall: false,
    storageKey: "",
    initializeState: () => {},
    addItem: () => {},
    updateItem: () => {},
    deleteItem: () => {},
    setItems: () => {},
    setEditMode: () => {}
};

type TAction =  { payload: TBookmarkState; type: REDUCER_ACTION_TYPE.INITIALIZE; } |
                { payload: TBookmarkItem[]; type: REDUCER_ACTION_TYPE.POPULATE_ITEMS; } |
                { 
                    payload: TBookmarkItem; 
                    type: 
                        REDUCER_ACTION_TYPE.ADD_ITEM|
                        REDUCER_ACTION_TYPE.UPDATE_ITEM|
                        REDUCER_ACTION_TYPE.DELETE_ITEM| 
                        REDUCER_ACTION_TYPE.UPDATE_ITEM;
                } |
                { type: REDUCER_ACTION_TYPE.SET_EDIT_MODE; payload: boolean}

const bookmarkReducer = (state: TBookmarkState, action: TAction): TBookmarkState => {
    const { type, payload } = action;
    console.log({ type:REDUCER_ACTION_TYPE[type], payload: payload });
  
    switch (type) {
        case REDUCER_ACTION_TYPE.INITIALIZE:
            return payload;
        case REDUCER_ACTION_TYPE.POPULATE_ITEMS:
            return {
                ...state, 
                items: payload
            };
        case REDUCER_ACTION_TYPE.ADD_ITEM:
            return {
                ...state, 
                items: [...state.items, payload]
            };
        case REDUCER_ACTION_TYPE.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter((x) => x.id !== payload.id)
            };
        case REDUCER_ACTION_TYPE.UPDATE_ITEM:
            return {
                ...state, 
                items: state.items.map(x => (x.id === payload.id) ? payload : x)
            };
        case REDUCER_ACTION_TYPE.SET_EDIT_MODE:
            return {
                ...state,
                isEdit: payload 
            };
        default:
            console.log(`No case for type ${type} found in bookmarkReducer.`);
            return state;
    }
  };
  
  export default bookmarkReducer;