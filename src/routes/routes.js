// routes.js
import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Private from '~/pages/Private';
import Blog from '~/pages/Blog/Blog';
import BlogDetails from '~/pages/Blog/BlogDetails';
import InsuranceAutomotivePhysical from '~/pages/InsuranceAutomotivePhysical';
import Indemnity from '~/pages/Indemnity/Indemnity';
import Chat from '~/pages/ChatBot/Chat';

// Admin
import Dashboard from '~/pages/DashBoard';
import UserAdmin from '~/pages/admin/UserAdmin';
import AdminLayout from '~/layouts/DefaultLayout/AdminLayout';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.insuranceAutomotivePhysical, component: InsuranceAutomotivePhysical },
];

// Admin routes
const adminRoutes = [
    { path: config.routes.admin, component: Dashboard, layout: AdminLayout },
    { path: config.routes.userAdmin, component: UserAdmin, layout: AdminLayout },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.blogDetails, component: BlogDetails },
    { path: config.routes.indemnity, component: Indemnity },
    { path: config.routes.chat, component: Chat },
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, adminRoutes, privateRoutes };
