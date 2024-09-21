import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Private from '~/pages/Private';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, privateRoutes };
