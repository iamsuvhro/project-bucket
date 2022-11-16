import { Dispatch } from "redux"

export const login = (status:Boolean) =>{
    return (dispatch:Dispatch) => {
        dispatch({
            type:'login',
            payload:status
        })
    }
}

export const logout = (status:Boolean) =>{
    return (dispatch:Dispatch) =>{
        dispatch({
            type:'logout',
            payload:status
        })
    }
}