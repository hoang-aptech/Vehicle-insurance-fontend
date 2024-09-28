// routes.js
import config from '~/config';
// import AdminSidebar from '~/pages/admin/AdminSidebar';
import UserAdmin from '~/pages/admin/UserAdmin';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Private from '~/pages/Private';
import AdminLayout from '~/layouts/DefaultLayout/AdminLayout';
import Dashboard from '~/pages/admin/Dashboard';
import Billing from '~/pages/admin/Billing';
import Vehicle from '~/pages/admin/Vehicle';
import Advertisement from '~/pages/admin/Advertisement';
import Insurance from '~/pages/admin/Insurance';
import Blog from '~/pages/admin/Blog';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    // Không cần AdminSidebar ở đây
];

// Admin routes
const adminRoutes = [
    { path: config.routes.userAdmin, component: UserAdmin, layout: AdminLayout },
    { path: '/admin', component: Dashboard, layout: AdminLayout },
    { path: config.routes.billing, component: Billing, layout: AdminLayout },
    { path: config.routes.vehicle, component: Vehicle, layout: AdminLayout },
    { path: config.routes.advertisement, component: Advertisement, layout: AdminLayout },
    { path: config.routes.insurance, component: Insurance, layout: AdminLayout },
    { path: config.routes.blog, component: Blog, layout: AdminLayout },
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, adminRoutes, privateRoutes };
