import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AccountWrapper from '@/components/AccountWrapper';
import colors from '@/constants/colors';
import IconButton from '@mui/material/IconButton';
import { useUserStore } from '@/state/userStore';
import NewProfileEmailModal from '@/components/account/profile/NewProfileEmailModal';
import VerifyNewEmailModal from '@/components/account/profile/VerifyNewEmailModal';


export default function ProfilePage() {
    const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);

    const [openEditProfileEmailModal, setOpenEditProfileEmailModal] = useState(false);
    const [openVerifyNewProfileEmailModal, setOpenVerifyNewProfileEmailModal] = useState(false);


    return (

        <AccountWrapper>
            <Box >
                <Stack alignItems="center">
                    <Stack direction="row" spacing="20px" 
                        alignItems="center" justifyItems="center"
                    >
                        <Typography variant='h1' component="h1"
                            sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                // fontSize: {xs: "39.96px", md: "60px"},
                                fontSize: {xs: "35px", md: "60px"},
                                lineHeight: {xs: "42.49px", md: "63.8px"},
                                letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                                textAlign: "center"
                            }}
                        > Profile Details </Typography>

                        <IconButton sx={{bgcolor: colors.tertiary}}
                            onClick={() => navigate("/account/profile/edit")}
                        >
                            <BorderColorOutlinedIcon sx={{color: colors.primary}} />
                        </IconButton>
                    </Stack>
                </Stack>

                <Box maxWidth="500px" mx="auto" my={5}>

                    <Grid container spacing="20px" mb={2}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "16px",
                                        color: colors.primary,
                                        mb: 1,
                                    }}
                                >First Name</Typography>

                                <Box
                                    sx={{
                                        bgcolor: "#E2CBA2",
                                        borderRadius: "8px",
                                        p: 1,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: colors.dark,
                                        }}
                                    >{userData.firstName}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "16px",
                                        color: colors.primary,
                                        mb: 1,
                                    }}
                                >Last Name</Typography>

                                <Box
                                    sx={{
                                        bgcolor: "#E2CBA2",
                                        borderRadius: "8px",
                                        p: 1,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: colors.dark,
                                        }}
                                    >{userData.lastName}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>


                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontWeight: "500",
                                fontSize: "16px",
                                lineHeight: "16px",
                                color: colors.primary,
                                mb: 1,
                            }}
                        >Email</Typography>

                        <Box
                            sx={{
                                bgcolor: "#E2CBA2",
                                borderRadius: "8px",
                                p: 1,
                                position: "relative"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    color: colors.dark,
                                }}
                            >{userData.email}</Typography>

                            <Box sx={{position: "absolute", top: "6px", right: "5px"}}>
                                <IconButton size='small' 
                                    sx={{bgcolor: colors.tertiary}}
                                    onClick={() => setOpenEditProfileEmailModal(true)}
                                >
                                    <EditOutlinedIcon 
                                        sx={{color: colors.primary, fontSize: "18px"}} 
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>

                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontWeight: "500",
                                fontSize: "16px",
                                lineHeight: "16px",
                                color: colors.primary,
                                mb: 1,
                            }}
                        >Phone number</Typography>

                        <Box
                            sx={{
                                bgcolor: "#E2CBA2",
                                borderRadius: "8px",
                                p: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    color: colors.dark,
                                }}
                            >{userData.phoneNumber}</Typography>
                        </Box>
                    </Box>

                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontWeight: "500",
                                fontSize: "16px",
                                lineHeight: "16px",
                                color: colors.primary,
                                mb: 1,
                            }}
                        >Country</Typography>

                        <Box
                            sx={{
                                bgcolor: "#E2CBA2",
                                borderRadius: "8px",
                                p: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    color: colors.dark,
                                }}
                            >{userData.country}</Typography>
                        </Box>
                    </Box>

                    {
                        userData.gender &&
                        <Box mb={2}>
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    color: colors.primary,
                                    mb: 1,
                                }}
                            >Gender</Typography>

                            <Box
                                sx={{
                                    bgcolor: "#E2CBA2",
                                    borderRadius: "8px",
                                    p: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        color: colors.dark,
                                    }}
                                >{userData.gender}</Typography>
                            </Box>
                        </Box>
                    }

                    {
                        userData.artistName && 
                        <Box mb={2}>
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    color: colors.primary,
                                    mb: 1,
                                }}
                            >Artist name</Typography>

                            <Box
                                sx={{
                                    bgcolor: "#E2CBA2",
                                    borderRadius: "8px",
                                    p: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        color: colors.dark,
                                    }}
                                >{userData.artistName}</Typography>
                            </Box>
                        </Box>
                    }

                    {
                        userData.recordLabelName &&
                        <Box mb={2}>
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    color: colors.primary,
                                    mb: 1,
                                }}
                            >Record label name</Typography>

                            <Box
                                sx={{
                                    bgcolor: "#E2CBA2",
                                    borderRadius: "8px",
                                    p: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        color: colors.dark,
                                    }}
                                >{userData.recordLabelName}</Typography>
                            </Box>
                        </Box>
                    }

                    {
                        userData.recordLabelLogo &&
                        <Box mb={2}>
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    color: colors.primary,
                                    mb: 1,
                                }}
                            >Record label logo</Typography>

                            <Box
                                sx={{
                                    width: "340px",
                                    height: "292px",
                                    bgcolor: colors.secondary,
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    mx: "auto"
                                }}
                            >
                                <img src={userData.recordLabelLogo} 
                                    alt='record label logo image preview'
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </Box>
                        </Box>
                    }


                    <Stack alignItems="center" mt={3}>
                        <Button variant="outlined" 
                            fullWidth type="button" 
                            onClick={() => navigate("/account/profile/edit")}
                            sx={{ 
                                bgcolor: colors.primary,
                                color: colors.milk,
                                border: 'none',
                                width: "30%",

                                "&.Mui-disabled": {
                                    // background: colors.secondary,
                                    // color: "#797979"
                                },
                                "&:hover": {
                                    bgcolor: colors.primary,
                                    // borderColor: colors.primary,
                                    border: 'none',
                                },
                                "&:active": {
                                    bgcolor: colors.primary,
                                    // borderColor: colors.primary,
                                    border: 'none',
                                },
                                "&:focus": {
                                    bgcolor: colors.primary,
                                    // borderColor: colors.primary,
                                    border: 'none',
                                },

                                padding: {xs: "9.05px 36.19px", md: "10px 40px" },

                                borderRadius: "12px",
                                textTransform: "unset"
                            }}
                        > Edit </Button>
                    </Stack>
                </Box>
            </Box>

            <NewProfileEmailModal 
                verifyModalCtrl={setOpenVerifyNewProfileEmailModal}
                closeModal={() => setOpenEditProfileEmailModal(false)}
                openModal={openEditProfileEmailModal}
            />

            <VerifyNewEmailModal 
                newEmailModalCtrl={setOpenEditProfileEmailModal}
                closeModal={() => setOpenVerifyNewProfileEmailModal(false)}
                openModal={openVerifyNewProfileEmailModal}
            />
        </AccountWrapper>
    )
}
