const initialState = {
    hover_count:1,
    notificationCount:0,
    notification:[]
};

const gitNotification = (state=initialState, action) =>{
    if (action.type === "setNotificationState"){
        return state = action.payload
    }
    else{
        return state;
    }
}
export default gitNotification;