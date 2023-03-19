import {createStore, applyMiddleware} from "redux";
import rootReducers from "./reducers/rootReducers";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const parsistConfig = {
    key:"persist-key",
    storage
}
const persistedReducer = persistReducer(parsistConfig, rootReducers)
const store = createStore(persistedReducer, {}, applyMiddleware(thunk))
const persistedStore = persistStore(store)

export default store
export {persistedStore}