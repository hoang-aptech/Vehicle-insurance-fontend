import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Context } from '~/Context';

function PrivateRoute() {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert('You cannot access here without logging in');
            navigate(config.routes.login);
        }
    }, []);

    return user ? <Outlet /> : null;
}

export default PrivateRoute;
