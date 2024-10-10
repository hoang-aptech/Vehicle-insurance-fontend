import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
    const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem('userToken')));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const handleLogoutUser = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        setUserToken(null);
        setUser(null);

        return true;
    };

    const contextValue = { userToken, setUserToken, user, setUser, handleLogoutUser };
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export { Context };
export default ContextProvider;
