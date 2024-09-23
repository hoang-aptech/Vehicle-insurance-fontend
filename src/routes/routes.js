// routes.js
import config from '~/config';
// import AdminSidebar from '~/pages/admin/AdminSidebar';
import UserAdmin from '~/pages/admin/UserAdmin';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Private from '~/pages/Private';
import AdminLayout from '~/layouts/DefaultLayout/AdminLayout';
import AdminHome from '~/pages/admin/AdminHome';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    // Không cần AdminSidebar ở đây
];

// Admin routes
const adminRoutes = [
    { path: config.routes.userAdmin, component: UserAdmin, layout: AdminLayout },
    { path: '/admin', component: AdminHome, layout: AdminLayout }, // Trang chính cho admin
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, adminRoutes, privateRoutes };
