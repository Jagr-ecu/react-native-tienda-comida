import * as tabActionTypes from "./tabActions"

const initialState = {
    selectedTab: ""
}

type ActionsTypes =
| { type: typeof tabActionTypes.SET_SELECTED_TAB, payload: { selectedTab:string }}


const tabReducer = (state = initialState, action:ActionsTypes) => {
    switch(action.type){
        case tabActionTypes.SET_SELECTED_TAB:
            return{
                ...state,
                selectedTab: action.payload.selectedTab
            }
        default:
            return state
    }
}

export default tabReducer