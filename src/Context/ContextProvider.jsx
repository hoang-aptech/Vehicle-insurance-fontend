import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
    const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem('userToken')));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [adminToken, setAdminToken] = useState(JSON.parse(localStorage.getItem('adminToken')));
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));

    const handleLogoutUser = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        setUserToken(null);
        setUser(null);

        return true;
    };
    const handleLogoutAdmin = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        setAdminToken(null);
        setAdmin(null);

        return true;
    };

    const contextValue = {
        userToken,
        setUserToken,
        user,
        setUser,
        handleLogoutUser,
        admin,
        setAdmin,
        adminToken,
        setAdminToken,
        handleLogoutAdmin,
    };
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export { Context };
export default ContextProvider;
