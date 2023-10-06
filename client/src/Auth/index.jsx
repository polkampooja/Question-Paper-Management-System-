import { createContext, useReducer } from 'react';
import React from 'react';
import { initialState, reducer } from '../reducers/userReducer';

export const UserContext = createContext(null);

export const Auth = (props)=>{

  const [ state, dispatch ]= useReducer(reducer,initialState);

  const loggedin =  (email)=>{
    dispatch({type:'EMAIL',payload:email});
  }
  const loggedOut = (email)=>{
    dispatch({type:'EMAIL',payload:''});
  }

  
  return (
    <UserContext.Provider  value={{state , loggedin, loggedOut}}>
      {props.children}
    </UserContext.Provider>
  )
}