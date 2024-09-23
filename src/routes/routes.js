import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Private from '~/pages/Private';
import Dashboard from '~/pages/DashBoard';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.dashboard, component: Dashboard },
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, privateRoutes };
