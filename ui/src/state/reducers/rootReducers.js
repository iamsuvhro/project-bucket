import {combineReducers} from "redux";
import authStatus from "./authReducer";
import githubProfile from "./githubProfileReducer";
import githubToken from "./githubTokenReducer";


const rootReducers = combineReducers({
    githubProfile: githubProfile,
    githubToken: githubToken,
    authStatus:authStatus
})


export default rootReducers