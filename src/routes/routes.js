// routes.js
import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';

import Private from '~/pages/Private';

import Blog, { BlogDetails } from '~/pages/Blog';
import InsuranceAutomotivePhysical from '~/pages/InsuranceAutomotivePhysical';
import Indemnity from '~/pages/Indemnity/Indemnity';
import Chat from '~/pages/ChatBot/Chat';
import Contract from '~/pages/Contract/Contract';

// Admin
import Dashboard from '~/pages/DashBoard';
import UserAdmin from '~/pages/admin/UserAdmin';
import Billing from '~/pages/admin/Billing';
import Vehicle from '~/pages/admin/Vehicle';
import Advertisement from '~/pages/admin/Advertisement';
import Insurance from '~/pages/admin/Insurance';
import BlogAmin from '~/pages/admin/Blog';
import AdminLayout from '~/layouts/DefaultLayout/AdminLayout';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.insuranceAutomotivePhysical, component: InsuranceAutomotivePhysical },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.blogDetails, component: BlogDetails },
    { path: config.routes.indemnity, component: Indemnity },
    { path: config.routes.chat, component: Chat },
    { path: config.routes.contract, component: Contract },
];

// Admin routes
const adminRoutes = [
    { path: config.routes.admin, component: Dashboard, layout: AdminLayout },
    { path: config.routes.userAdmin, component: UserAdmin, layout: AdminLayout },
    { path: config.routes.billingAdmin, component: Billing, layout: AdminLayout },
    { path: config.routes.vehicleAdmin, component: Vehicle, layout: AdminLayout },
    { path: config.routes.advertisementAdmin, component: Advertisement, layout: AdminLayout },
    { path: config.routes.insuranceAdmin, component: Insurance, layout: AdminLayout },
    { path: config.routes.blogAmin, component: BlogAmin, layout: AdminLayout },
];

// Private routes
const privateRoutes = [{ path: config.routes.private, component: Private }];

export { publicRoutes, adminRoutes, privateRoutes };
