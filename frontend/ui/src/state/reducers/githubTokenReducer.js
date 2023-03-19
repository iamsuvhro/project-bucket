const initialState = {
    token:"",
    username:""
};

const githubToken = (state=initialState, action) =>{
    if (action.type === "updateTokenDetails"){
        return state = action.payload
    }
    else{
        return state;
    }
}
export default githubToken;