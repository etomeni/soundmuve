import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '../../state/userStore';

const AccountLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    if (!isLoggedIn) return <Navigate replace to={"/auth/login"} />;

    return (
        <main>
            <Outlet />
        </main>
    );
};

export default AccountLayout;