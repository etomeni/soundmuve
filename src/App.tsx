import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import { useUserStore } from "./state/userStore";
import { useSettingStore } from "./state/settingStore";
import { createReleaseStore } from "./state/createReleaseStore";

function App() {
    const _handleRestoreUser = useUserStore((state) => state._handleRestoreUser);
    const _restoreSettings = useSettingStore((state) => state._restoreSettings);
    const _restoreAllRelease = createReleaseStore((state) => state._restoreAllRelease);
        
    const handleRefreshNredirect = () => {
        // sessionStorage.setItem('lastPath', window.location.pathname);
        _restoreSettings();
        _handleRestoreUser();
        _restoreAllRelease();
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