import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Context } from '~/Context';

function PrivateRoute() {
    const { user, admin } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            if (!admin) {
                alert('You cannot access admin without logging in');
                navigate(config.routes.loginAdmin);
                return;
            }
            alert('You cannot access here without logging in');
            navigate(config.routes.login);
        }
    }, []);

    return user || admin ? <Outlet /> : null;
}

export default PrivateRoute;
