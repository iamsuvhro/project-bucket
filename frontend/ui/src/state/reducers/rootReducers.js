import {combineReducers} from "redux";
import authStatus from "./authReducer";
import githubProfile from "./githubProfileReducer";
import githubToken from "./githubTokenReducer";
import gitNotification from "./notificationReducer";
import userDetails from "./userReducer";


const rootReducers = combineReducers({
    githubProfile: githubProfile,
    githubToken: githubToken,
    authStatus:authStatus,
    gitNotification:gitNotification,
    user:userDetails
})


export default rootReducers