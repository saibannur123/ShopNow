import React from 'react';
import {useReducer, createContext} from 'react';
import {storeReducer} from './storeReducer'

export const Store = createContext();

const inititialState = {
    userInfo: null,
    cart: [],
}

export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(storeReducer, inititialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}