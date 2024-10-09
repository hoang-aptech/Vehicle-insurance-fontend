// routes.js
import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

import Private from '~/pages/Private';

import Blog, { BlogDetails } from '~/pages/Blog';
import InsuranceDetails from '~/pages/InsuranceDetails';
import Indemnity from '~/pages/Indemnity/Indemnity';
import Chat from '~/pages/ChatBot/Chat';
import InsurancePackages from '~/pages/InsurancePackages';
import Contract, { ContractList } from '~/pages/Contract';

// Admin
import Dashboard from '~/pages/admin/Dashboard';
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
    { path: config.routes.register, component: Register },
    { path: config.routes.insuranceDetails, component: InsuranceDetails },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.blogDetails, component: BlogDetails },
    { path: config.routes.indemnity, component: Indemnity },
    { path: config.routes.chat, component: Chat, params: { chatId: 1, role: 'User' } },
    { path: config.routes.chat2, component: Chat, params: { chatId: 1, role: 'Employee' } },
    { path: config.routes.contractList, component: ContractList },
    { path: config.routes.contract, component: Contract },
    { path: config.routes.insurancePackages, component: InsurancePackages },
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
