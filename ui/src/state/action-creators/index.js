
// Action for update or add github profile details in state
export const updateGithubProfiles = (profileDetails) =>{
    return (dispatch) =>{
        dispatch({
            type: "updateGitProfile",
            payload: profileDetails
        })
    }
} 

export const updateToken = (tokenDetails) =>{
    return (dispatch) =>{
        dispatch({
            type: "updateTokenDetails",
            payload: tokenDetails
        })
    }
}

export const authState = (boolValue) =>{
    return (dispatch) =>{
        dispatch({
            type: "setAuthState",
            payload: boolValue
        })
    }
}

