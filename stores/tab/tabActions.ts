import { Dispatch } from 'redux';

export const SET_SELECTED_TAB = 'SET_SELECTED_TAB'

export const setSelectTabSuccess = (selectedTab:string) => ({
    type: SET_SELECTED_TAB,
    payload: { selectedTab }
})

export function setSelectedTab (selectedTab:string){
    return (dispatch:Dispatch) => {
        dispatch(setSelectTabSuccess(selectedTab))
    }
}