import { useTheme } from '@mui/material/styles';
import SignupMobileComponent from '@/components/auth/SignupMobile';
import SignupDesktopComponent from '@/components/auth/SignupDesktop';
import useMediaQuery from '@mui/material/useMediaQuery';


function Signup() {
    const theme = useTheme();
    const xsMatches = useMediaQuery(theme.breakpoints.down('md'));
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    if (xsMatches) {
        return <SignupMobileComponent />
    } else {
        return <SignupDesktopComponent />
    }
    
}

export default Signup;
