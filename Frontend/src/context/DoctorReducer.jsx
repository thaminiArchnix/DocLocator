import React from 'react'

export const initialState = {
    user: null,
  };
  
  export const userReducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return { 
            ...prevState,
            user: action.payload 
        };
      case 'logout':
        return { user: null };
      default:
        return state;
    }
  };