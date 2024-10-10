import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const user = JSON.parse(localStorage.getItem('user'));
    const contextValue = { userToken, user };
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export { Context };
export default ContextProvider;
