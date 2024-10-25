import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useRecordLabelFn } from '@/hooks/recordLabel/useRecordLabelFn';
import { useUserStore } from '@/state/userStore';
import NewReleaseRLartist from './NewReleaseRLartist';
import colors from '@/constants/colors';
import { recordLabelArtistInterface } from '@/typeInterfaces/recordLabelArtist.interface';


interface _Props {
    openReleaseModal: boolean,
    closeReleaseModal: () => void;
}

const NewReleaseModalComponent: React.FC<_Props> = ({
    openReleaseModal, closeReleaseModal
}) => {
    const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);
    // const [selectedRlArtist, setselectedRlArtist] = React.useState<recordLabelArtistInterface>();
    const [selectedReleaseType, setSelectedReleaseType] = React.useState<"single" | "album">();
    const [showArtistSearch, setshowArtistSearch] = React.useState(false);

    const {
        getAllRecordLabelArtist,
        recordLabelArtist,
    } = useRecordLabelFn();
    
    React.useEffect(() => {
        if (openReleaseModal) {
            setSelectedReleaseType(undefined);
            // setselectedRlArtist(undefined);
            setshowArtistSearch(false);
    
            // "Record Label"
            if (userData.userType.toLowerCase() == "record label") {
                getAllRecordLabelArtist();
            }
        }
    }, [openReleaseModal])

    const handleSelectedArtist = (artist: recordLabelArtistInterface) => {
        // console.log(artist);
        // setselectedRlArtist(artist);

        const params = {
            recordLabelArtist_id: artist._id,
        };

        if (selectedReleaseType == "single") {
            // /account/create-single-release
            navigate({
                pathname: "/account/create-single-release",
                search: `?${createSearchParams(params)}`,
            });
        } else if (selectedReleaseType == "album") {
            // /account/create-album-release-details
            navigate({
                pathname: "/account/create-album-release-details",
                search: `?${createSearchParams(params)}`,
            });
        }
    }

    const handleReleaseTypeClicked = (releaseType: typeof selectedReleaseType) => {
        setSelectedReleaseType(releaseType);

        if (userData.userType.toLowerCase() == "record label") {
            setshowArtistSearch(true);
            return;
        } 

        if (releaseType == "album") {
            navigate("/account/create-album-release-details");
        } else if (releaseType == "single") {
            navigate("/account/create-single-release")
        }
    }

    

    const releaseTypeView = (
        <Box>
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
                <Box onClick={() => handleReleaseTypeClicked("single")} sx={{
                    // p: "10px 29px 10px 29px",
                    px: "15px",
                    // py: "5px",
                    border: `1px solid ${colors.primary}`,
                    borderRadius: "8px",
                    // background: "#9F9F9F",
                    color: colors.dark,
                    cursor: "pointer",
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

                <Box onClick={() => handleReleaseTypeClicked("album")} sx={{
                    // p: "10px 29px 10px 29px",
                    px: "15px",
                    borderRadius: "8px",
                    border: `1px solid ${colors.primary}`,
                    color: colors.dark,
                    cursor: "pointer",
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
            </Box>
        </Box>
    )


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

                    { 
                        showArtistSearch ? 
                            <NewReleaseRLartist 
                                options={recordLabelArtist}
                                handleSelected={handleSelectedArtist}
                                selectedValue={undefined} // {selectedRlArtist}
                            />
                        : releaseTypeView 
                    }

                </Box>
            </Box>
        </Modal>
    )
}

export default NewReleaseModalComponent;