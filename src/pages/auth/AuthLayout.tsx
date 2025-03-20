import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '@/state/userStore';


const AuthLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    return (
        <main>
            {
                isLoggedIn ? <Navigate replace  to={"/account/"} />
                : <Outlet />
            }
        </main>
    );
};

export default AuthLayout;