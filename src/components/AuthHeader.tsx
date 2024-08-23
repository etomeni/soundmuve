import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import SoundMuve from "./../assets/images/SoundMuve.png";


export default function AuthHeaderComponent() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            height: {xs: "56px", md: "64px"}, 
            bgcolor: "#000000C4",
            backdropFilter: "blur(5px)",

            display: "flex",
            flexDirection: "row",
            alignItems: 'centers',
            // justifyContent: "flex-start",
            px: 3,
            zIndex: 9,
            position: "relative"
        }}>
            <Box sx={{ alignSelf: "center", cursor: 'pointer' }} onClick={() => navigate("/") }>
                <img src={SoundMuve} alt="SoundMuve logo" style={{width: 130}} />
            </Box>
        </Box>

        // <AppBar component="nav" color='transparent' sx={{bgcolor: "#000000C4"}} position='absolute'>
        //     <Toolbar>
        //         <Box sx={{flexGrow: 1}} onClick={() => navigate("/") }>
        //             <img src={SoundMuve} alt="Logo" style={{width: 130}} />
        //         </Box>
        //     </Toolbar>
        // </AppBar>
    );
}
