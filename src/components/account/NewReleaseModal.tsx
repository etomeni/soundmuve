import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


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
                        bgcolor: "#272727",
                        maxWidth: {xs: "92%", sm: "85%", md: "846px"},
                        maxHeight: "404px",
                        borderRadius: "12px",
                        p: "25px",
                        color: "#fff"
                    }}
                >
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeReleaseModal() }>
                            <CloseIcon 
                                sx={{color: "#fff", fontSize: "16px"}} 
                            />
                        </IconButton>
                    </Box>
                    
                    <Typography id="release-modal-title" variant="h6" component="h2"
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "30px", md: "50px"},
                            lineHeight: {xs: "40px", md: "63.8px"},
                            letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                            textAlign: "center"
                        }}
                    >
                        What would you like to release?
                    </Typography>

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
                                borderRadius: "8px",
                                background: "#9F9F9F",
                                ":hover": {
                                    boxShadow: "1px 3px 18px 0px #C89FF5"
                                }
                            }}>
                                <Typography sx={{
                                    fontWeight: '900',
                                    fontSize: "25px",
                                    lineHeight: "40px",
                                    letterSpacing: "-0.13px",
                                    textAlign: 'center',
                                    color: "#fff",
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
                                background: "#9F9F9F",
                                ":hover": {
                                    boxShadow: "1px 3px 18px 0px #C89FF5"
                                }

                            }}>
                                <Typography sx={{
                                    fontWeight: '900',
                                    fontSize: "25px",
                                    lineHeight: "40px",
                                    letterSpacing: "-0.13px",
                                    textAlign: 'center',
                                    color: "#fff",
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