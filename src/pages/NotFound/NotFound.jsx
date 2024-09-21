import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(config.routes.home);
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Redirecting to home...</p>
        </div>
    );
}

export default NotFound;
