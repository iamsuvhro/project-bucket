import {createContext, useContext} from 'react';


export type UserContent = {
    authStatus: boolean
    
}
// Creating react context api
export const UserContext = createContext<UserContent>({
    authStatus:false,
});

export const useUserContext = () => useContext(UserContext)
