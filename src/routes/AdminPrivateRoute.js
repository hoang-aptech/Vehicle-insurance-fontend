import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Context } from '~/Context';

function AdminPrivateRoute() {
    const { admin } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            alert('You cannot access admin without logging in');
            navigate(config.routes.loginAdmin);
        }
    }, []);

    return admin ? <Outlet /> : null;
}

export default AdminPrivateRoute;
