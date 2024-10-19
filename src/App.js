// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { privateRoutes, publicRoutes, adminRoutes, AdminPrivateRoute, UserPrivateRoute } from './routes';
import NotFound from './pages/NotFound';
import DefaultLayout from './layouts/DefaultLayout';
import AdminLayout from './layouts/DefaultLayout/AdminLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        let params = {};

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        if (typeof route.params === 'object') {
                            params = route.params;
                        }

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page {...params} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {adminRoutes.map((route) => {
                        const Page = route.component;
                        let Layout = route.layout || AdminLayout;

                        let params = {};

                        if (typeof route.params === 'object') {
                            params = route.params;
                        }

                        return (
                            <Route key={route.path} element={<AdminPrivateRoute />}>
                                <Route
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page {...params} />
                                        </Layout>
                                    }
                                />
                            </Route>
                        );
                    })}
                    {privateRoutes.map((route) => {
                        const Page = route.component;
                        let Layout = route.layout || DefaultLayout;

                        return (
                            <Route key={route.path} element={<UserPrivateRoute />}>
                                <Route
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </Route>
                        );
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
