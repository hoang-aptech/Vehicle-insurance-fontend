import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')) || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!token || false);
    const [userLoggedIn, setUserLoggedIn] = useState(JSON.parse(sessionStorage.getItem('userLoggedIn')) || {});
    const contextValue = { isLoggedIn, setIsLoggedIn, userLoggedIn, setUserLoggedIn, token, setToken };
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export { Context };
export default ContextProvider;
