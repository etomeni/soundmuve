import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import colors from '@/constants/colors';


interface _Props {
    openReleaseModal: boolean,
    closeReleaseModal: () => void;
}

const NewReleaseModalComponent: React.FC<_Props> = ({
    openReleaseModal, closeReleaseModal
}) => {

    return (
        <Modal
            open={openReleaseModal}
            onClose={() => closeReleaseModal() }
            aria-labelledby="release-modal-title"
            aria-describedby="release-modal-description"
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
                <Box 
                    sx={{
                        bgcolor: colors.bg,
                        maxWidth: {xs: "92%", sm: "85%", md: "846px"},
                        maxHeight: "404px",
                        borderRadius: "12px",
                        p: "25px",
                        color: colors.dark
                    }}
                >
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeReleaseModal() }>
                            <CloseIcon 
                                sx={{color: colors.primary, fontSize: "16px"}} 
                            />
                        </IconButton>
                    </Box>
                    
                    <Typography id="release-modal-title" variant="h4" component="h4"
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "30px", md: "50px"},
                            lineHeight: {xs: "40px", md: "63.8px"},
                            letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                            textAlign: "center"
                        }}
                    > What would you like to release? </Typography>

                    <Box id="release-modal-description" 
                        sx={{ 
                            my: 5,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >

                        <Link to="/account/create-single-release" style={{
                            textDecoration: "none",
                            color: "#000000",
                            border: "none",
                            outline: "none",
                        }}>
                            <Box sx={{
                                // p: "10px 29px 10px 29px",
                                px: "15px",
                                // py: "5px",
                                border: `1px solid ${colors.primary}`,
                                borderRadius: "8px",
                                // background: "#9F9F9F",
                                color: colors.dark,
                                ":hover": {
                                    boxShadow: `1px 3px 18px 0px ${colors.primary}`,
                                    background: "linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)",
                                    color: colors.milk,
                                }
                            }}>
                                <Typography variant='body1' sx={{
                                    fontWeight: '900',
                                    fontSize: "25px",
                                    lineHeight: "40px",
                                    letterSpacing: "-0.13px",
                                    textAlign: 'center',
                                }}> Single </Typography>
                            </Box>
                        </Link>

                        <Link to="/account/create-album-release-details" style={{
                            textDecoration: "none",
                            color: "#000000",
                            border: "none",
                            outline: "none",
                        }}>
                            <Box sx={{
                                // p: "10px 29px 10px 29px",
                                px: "15px",
                                borderRadius: "8px",
                                border: `1px solid ${colors.primary}`,
                                color: colors.dark,
                                ":hover": {
                                    boxShadow: `1px 3px 18px 0px ${colors.primary}`,
                                    background: "linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)",
                                    color: colors.milk,
                                }

                            }}>
                                <Typography variant='body1' sx={{
                                    fontWeight: '900',
                                    fontSize: "25px",
                                    lineHeight: "40px",
                                    letterSpacing: "-0.13px",
                                    textAlign: 'center',
                                }}> Album </Typography>
                            </Box>
                        </Link>

                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default NewReleaseModalComponent;