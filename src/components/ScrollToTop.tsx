import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getLocalStorage } from '../util/storage';
import { useUserStore } from '../state/userStore';
import { apiEndpoint } from '../util/resources';
import LoadingComponent from './Loading';
import SnackbarToast from './ToastNotification';
import { useSettingStore } from '../state/settingStore';

const ScrollToTop = () => {
    const _autoLogin = useUserStore((state) => state._autoLogin);
    const _logOutUser = useUserStore((state) => state._logOutUser);

    const toastNotification = useSettingStore((state) => state.toastNotification);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        // setIsLoading(false);
        reAuthUser();
    }, []);

         
    const reAuthUser = async () => {
        const access_token = getLocalStorage("access_token")
        const refresh_token = getLocalStorage("refreshToken");
        const user_data = getLocalStorage("user");

        if (!access_token || !refresh_token || !user_data ) {
            setIsLoading(false);
            return;
        }

        if (!pathname.includes("/account") || !pathname.includes("/auth")) {
            setIsLoading(false);
        }

        try {
            (await axios.get(`${apiEndpoint}/auth/maintainPersistence`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    refresh: `Bearer ${refresh_token}`
                }
            })).data;
            // console.log(response);

            setIsLoading(false);
            if (user_data && access_token) _autoLogin(user_data);

            return true;
        } catch (error: any) {
            const err = error.response.data;
            console.log(err);
            setIsLoading(false);
            _logOutUser();

            return false;
        }
    }


    return (
        <main>
            { 
                isLoading ? <LoadingComponent /> : <Outlet />
            }

            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => _setToastNotification({ ...toastNotification, display: false})}
            />
        </main>
    );
};

export default ScrollToTop;