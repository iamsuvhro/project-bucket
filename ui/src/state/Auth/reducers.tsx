type Action = {
    type: string,
    payload: boolean
}


const userAuth = (state: boolean = false, action:Action) =>{
    if (action.type=='login'){
        state = action.payload
        return state;
    }
    else if (action.type=='logout'){
        state = action.payload
        return state;
    }
    else {
        return state;
    }
}

export default userAuth;