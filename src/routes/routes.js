// routes.js
import config from '~/config';
// import AdminSidebar from '~/pages/admin/AdminSidebar';
import UserAdmin from '~/pages/admin/UserAdmin';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Private from '~/pages/Private';
import Dashboard from '~/pages/DashBoard';
import AdminLayout from '~/layouts/DefaultLayout/AdminLayout';
import InsuranceAutomotivePhysical from '~/pages/InsuranceAutomotivePhysical';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.insuranceAutomotivePhysical, component: InsuranceAutomotivePhysical },
];

// Admin routes
const adminRoutes = [
    { path: config.routes.userAdmin, component: UserAdmin, layout: AdminLayout },
    { path: config.routes.admin, component: Dashboard, layout: AdminLayout },
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, adminRoutes, privateRoutes };
