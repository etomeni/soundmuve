import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '@/state/userStore';
import { useCartItemStore } from '@/state/cartStore';

const AccountLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    const _restoreCartItems = useCartItemStore((state) => state._restoreCartItems);
    useEffect(() => {
        _restoreCartItems();
    }, []);

    return (
        <main>
            {
                isLoggedIn ? 
                    <Outlet />
                : <Navigate replace to={"/auth/login"} />
            }
        </main>
    );
};

export default AccountLayout;