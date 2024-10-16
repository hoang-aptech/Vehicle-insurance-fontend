const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    private: '/private-test',
    blog: '/blog',
    blogDetails: '/blog-details/:id',
    insuranceDetails: '/insurance-details/:id',
    indemnity: '/indemnity',
    chat: '/chat',
    contract: '/contract/:id',
    contractList: '/contract-list',
    chat2: '/chat2',
    insurancePackages: '/insurance-packages/:insuranceId',

    loginAdmin: '/admin-login',
    admin: '/admin',
    userAdmin: '/admin/user-admin',
    billingAdmin: '/admin/billing-admin',
    vehicleAdmin: '/admin/vehicle-admin',
    advertisementAdmin: '/admin/advertisement-admin',
    insuranceAdmin: '/admin/insurance-admin',
    blogAdmin: '/admin/blog-admin',
    sendEmailReminderAdmin: '/admin/send-email-reminder',
    insurancePackage: '/admin/insurance-package-admin',
    insurances: '/insurances',
};

export default routes;
