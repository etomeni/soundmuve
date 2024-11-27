import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import AccountWrapper from '@/components/AccountWrapper';
import LoadingComponent from '@/components/Loading';
import { useUserStore } from '@/state/userStore';


function DashboardHome() {
    const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);

    const checkAccountType = () => {
        if (userData.userType == "artist") {
            navigate("/account/artist", {replace: true});
            return;
        }

        if (userData.userType == "record label") {
            navigate("/account/record-label", {replace: true});
            return;
        }
    }    

    
    useEffect(() => {
        // navigate("/account/artist", {replace: true});
        // redirect("/account/home");
        // return <Navigate replace  to={"/account/"} />;

        checkAccountType();
    }, [userData]);
    

    return (
        <AccountWrapper>
            <Box>

                <LoadingComponent />

            </Box>
        </AccountWrapper>
    )
}

export default DashboardHome;
