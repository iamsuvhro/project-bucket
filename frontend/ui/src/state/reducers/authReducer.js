const initialState = false

const authStatus = (state=initialState, action) =>{
    if (action.type === "setAuthState"){
        return state = action.payload
    }
    else{
        return state;
    }
}
export default authStatus;