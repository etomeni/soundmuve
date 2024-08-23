import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '../../state/userStore';

const AuthLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    if (isLoggedIn) {
        // redirect("/account/home");
        return <Navigate replace  to={"/account/"} />;
    } 

    return (
        <main>
            <Outlet />
        </main>
    );
};

export default AuthLayout;