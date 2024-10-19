// routes.js
import config from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

import Blog, { BlogDetails } from '~/pages/Blog';
import InsuranceDetails from '~/pages/InsuranceDetails';
import Indemnity from '~/pages/Indemnity/Indemnity';
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
import InsurancePackage from '~/pages/admin/InsurancePackage';
import AdminLogin from '~/pages/AdminLogin';
import SendReminderEmails from '~/pages/admin/send-email-reminder/SendEmailReminder';
import AdminInsuranceContent from '~/pages/AdminInsuranceContent';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.insuranceDetails, component: InsuranceDetails },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.blogDetails, component: BlogDetails },
    { path: config.routes.insurancePackages, component: InsurancePackages },
    { path: config.routes.contract, component: Contract },
    { path: config.routes.loginAdmin, component: AdminLogin, layout: null },
];

// Admin routes
const adminRoutes = [
    { path: config.routes.admin, component: Dashboard },
    { path: config.routes.userAdmin, component: UserAdmin },
    { path: config.routes.billingAdmin, component: Billing },
    { path: config.routes.vehicleAdmin, component: Vehicle },
    { path: config.routes.advertisementAdmin, component: Advertisement },
    { path: config.routes.insuranceAdmin, component: Insurance },
    { path: config.routes.blogAdmin, component: BlogAmin },
    { path: config.routes.insurancePackage, component: InsurancePackage },
    { path: config.routes.sendEmailReminderAdmin, component: SendReminderEmails },
    { path: config.routes.indemnityAdmin, component: Indemnity, params: { role: 'admin' } },
    { path: config.routes.insuranceContentAdmin, component: AdminInsuranceContent },
];

// Private routes
const privateRoutes = [
    { path: config.routes.contractList, component: ContractList },
    { path: config.routes.indemnity, component: Indemnity },
];

export { publicRoutes, adminRoutes, privateRoutes };
