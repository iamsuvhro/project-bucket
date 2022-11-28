import React from 'react'
import userContext from './userContext';


const UserState = (props) => {
  const state = {
    'authStatus':false
  }
  return(
    <UserState.Provider value={state}>
      {props.children}
    </UserState.Provider>
  )
}

export default UserState;