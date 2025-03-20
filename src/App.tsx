import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import { useUserStore } from "./state/userStore";
import { useSettingStore } from "./state/settingStore";
import { useCreateReleaseStore } from "./state/createReleaseStore";
// import { useCartItemStore } from "./state/cartStore";

function App() {
    const _handleRestoreUser = useUserStore((state) => state._handleRestoreUser);
    const _restoreSettings = useSettingStore((state) => state._restoreSettings);
    const _restoreAllRelease = useCreateReleaseStore((state) => state._restoreAllRelease);
    // const _restoreCartItems = useCartItemStore((state) => state._restoreCartItems);
        
    const handleRefreshNredirect = () => {
        _restoreSettings();
        _handleRestoreUser();
        _restoreAllRelease();
        // _restoreCartItems();
    }

    useEffect(() => {
        handleRefreshNredirect();
    }, []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;