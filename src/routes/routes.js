import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Private from '~/pages/Private';
import Dashboard from '~/pages/DashBoard';
import HomeNew from '~/pages/Home/Home';
import Blog from '~/pages/Blog/Blog';
import BlogDetails from '~/pages/Blog/BlogDetails';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.homenew, component: HomeNew },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.blogdetails, component: BlogDetails },
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, privateRoutes };
