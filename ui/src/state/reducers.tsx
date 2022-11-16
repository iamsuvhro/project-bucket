import { combineReducers } from "redux";
import userAuth from "./Auth/reducers";


const reducers = combineReducers({
    authStatus: userAuth
})

export default reducers;

export type State = ReturnType<typeof reducers>