import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Context } from '~/Context';

function PrivateRoute() {
    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(config.routes.login);
        }
    }, []);

    return isLoggedIn ? <Outlet /> : null;
}

export default PrivateRoute;
