import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import colors from '@/constants/colors';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';

import dayjs from 'dayjs';
// import { useUserStore } from '@/state/userStore';
import { minReleaseDate } from '@/util/resources';


interface myProps {
    // release_id: string,
    release_date: string,
    openModal: boolean,
    closeModal: () => void;
    setNewReleaseDate: (value: string) => void;
};

const ChangeReleaseDateComponent: React.FC<myProps> = ({
    openModal, closeModal, release_date, setNewReleaseDate
}) => {
    // const userData = useUserStore((state) => state.userData);
    const [releaseDate, setReleaseDate] = React.useState(release_date);

    const [apiResponse, setApiResponse] = React.useState({
        display: false,
        status: true,
        message: ""
    });

    
    const handleContinueBtn = () => {
        if (!releaseDate) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please select a new release date to continue."
            })
            return;
        }

        setNewReleaseDate(releaseDate);
    }


    return (
        <Modal
            open={openModal}
            onClose={() => closeModal() }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none"
                }}
            >
                <Box sx={{
                    bgcolor: colors.bg,
                    maxWidth: {xs: "92%", sm: "80%", md: "70%" },
                    maxHeight: "605px",
                    borderRadius: "12px",
                    p: "25px",
                    color: colors.dark
                }}>
                    <Box id="payout-modal-title">
                        <Stack direction="row" spacing="20px" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="h2"
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "16px", md: "18px"},
                                    // lineHeight: {xs: "15px", md: "18.16px"},
                                    letterSpacing: "-0.1px",
                                    textAlign: "center",
                                    // mt: 2
                                }}
                            > Change Release Date </Typography>

                            <IconButton size='small' onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: colors.primary, fontSize: "24px"}} 
                                />
                            </IconButton>
                        </Stack>
                    </Box>


                    <Box id="payout-modal-description" 
                        sx={{
                            mt: 3, // mx: "auto",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Release Date" format="DD/MM/YYYY"
                                        value={dayjs(releaseDate)}
                                        // minDate={dayjs(userData.createdAt)}
                                        minDate={dayjs(minReleaseDate())}
                                        // maxDate={dayjs()}

                                        onChange={(newValue) => {
                                            const value = dayjs(newValue).format('YYYY/MM/DD');
                                            // console.log(value);
                                            setReleaseDate(value);

                                            setApiResponse({
                                                display: false,
                                                status: true,
                                                message: ""
                                            });
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>


                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 4 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }

                        <Box mt={3}>
                            <Button variant="contained"
                                // endIcon={<KeyboardArrowDownIcon />}
                                sx={{
                                    color: "#fff",
                                    borderRadius: "8px",
                                    bgcolor: "#272727",
                                    // textAlign: "center",
                                    border: "none",
                                                    
                                    "&:hover": {
                                        bgcolor: "#272727",
                                    },
                                    "&:active": {
                                        bgcolor: "#272727",
                                    },
                                    "&:focus": {
                                        bgcolor: "#272727",
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: "#797979",
                                    }
                                }}

                                onClick={handleContinueBtn}
                            >Continue</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ChangeReleaseDateComponent;

