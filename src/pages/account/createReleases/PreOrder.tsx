import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AccountWrapper from '@/components/AccountWrapper';
import colors from '@/constants/colors';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from 'react-router-dom';
// import { useCartItemStore } from '@/state/cartStore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid/Grid';
import { usePreOrderHook } from './usePreOrderHook';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import LoadingDataComponent from '@/components/LoadingData';
import SuccessModalComponent from '@/components/account/SuccessModal';
import { minReleaseDate } from '@/util/resources';
import ChangeReleaseDateComponent from './ChangeReleaseDate';
import { useCart } from '@/hooks/useCart';
import { releaseInterface } from '@/typeInterfaces/release.interface';


let errors = {
    // status: false,
    channel: "",
    preOrderDate: "",
    trackPreview: "",
    releaseDate: "",
};

function PreOrderPage() {
    const navigate = useNavigate();
    const { release_id } = useParams();
    const [releaseDateModal, setReleaseDateModal] = useState(false);
    const { handleRemoveCartItem, cartItems } = useCart();

    const {
        apiResponse, setApiResponse,

        preOrderChannel, setPreOrderChannel,
        preOrderDate, setPreOrderDate,
        preOrderTrackPreview, setPreOrderTrackPreview,
        // preOrderPrice, setPreOrderPrice,
        // trackPrice, setTrackPrice,

        releaseData,
        getReleaseById,
        handleSkipPreOrder,
        updateReleaseDateById,
        submitPreOrderRelease,
        openSuccessModal, setOpenSuccessModal,
    } = usePreOrderHook();

    useEffect(() => {
        if (release_id) {
            getReleaseById(release_id);
        } else {
            navigate(-1);
        }
    }, [release_id]);

    useEffect(() => {
        if (releaseData) {
            if (releaseData.preOrder?.preOrderChannel) {
                setPreOrderChannel(releaseData.preOrder?.preOrderChannel);
            }

            if (releaseData.preOrder?.preOrderStartDate) {
                setPreOrderDate(releaseData.preOrder?.preOrderStartDate)
            }

            if (releaseData.preOrder?.preOrderTrackPreview?.song_id) {
                const song = releaseData.songs.find((value) => value._id == releaseData.preOrder?.preOrderTrackPreview.song_id);
                if (song) setPreOrderTrackPreview(song);
            }

        }
    }, [releaseData]);

    const handleContineBtn = () => {
        errors = {
            // status: false,
            channel: "",
            preOrderDate: "",
            trackPreview: "",
            releaseDate: "",
        }

        setApiResponse({
            display: false,
            status: false,
            message: ''
        });


        if (!preOrderChannel) {
            errors.channel = "Please select a pre-order option 'None' or 'iTunes'.";

            setApiResponse({
                display: true,
                status: false,
                message: errors.channel
            });

            return;
        }

        if (releaseData && preOrderChannel == "None") {
            handleSkipPreOrder(releaseData);
            return;
        }

        if (!preOrderDate) {
            errors.preOrderDate = "Pre-order start date is required.";

            setApiResponse({
                display: true,
                status: false,
                message: errors.preOrderDate
            });

            return;
        }

        // if (!preOrderTrackPreview) {
        //     errors.trackPreview = "Pre-order Track preview is required.";

        //     setApiResponse({
        //         display: true,
        //         status: false,
        //         message: errors.trackPreview
        //     });

        //     return;
        // }

        // submit to endpoint

        cartItems.forEach((item) => {
            const id = release_id || releaseData?._id || '';
            if (item.release_id == id) {
                handleRemoveCartItem(item);
            }
        });


        submitPreOrderRelease(
            release_id || releaseData?._id || '',
            {
                status: true,
                preOrderChannel: preOrderChannel,
                preOrderStartDate: preOrderDate,
                preOrderTrackPreview: {
                    song_id: preOrderTrackPreview?._id || '',
                    songTitle: preOrderTrackPreview?.songTitle || ''
                },
                trackPrice: 0,
                preOrderPrice: 0,
            },
            () => {

            }
        )
    }

    const handleSelectedTrack = (release: releaseInterface) => {
        const index = release.songs.findIndex(item => item._id == preOrderTrackPreview?._id);

        if (index != -1) {
            return index;
            // console.log(index); // Output: 1
        } else {
            return undefined;
            // console.log(undefined); // Output: undefined
        }
    }
    

    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box my={5}>
                {
                    releaseData ? 
                        <Box>
                            <Box
                                sx={{
                                    maxWidth: {xs: "330px",  sm: "95%", md: "892px"},
                                    border: {
                                        xs: `0.45px solid ${ colors.dark }`,
                                        md: `1px solid ${ colors.dark }`
                                    },
                                    borderRadius: {xs: "5.42px", md: "12px"},
                                    overflow: "hidden",
                                    mx: "auto"
                                    // bgcolor: colors.secondary
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", md: "72px"},
                                        bgcolor: colors.tertiary,
                                        color: colors.milk,
                                        // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                        px: {xs: "10px", md: "25px"},
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "20px",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: {xs: "13px", sm: "15px", md: "24px"},
                                            // lineHeight: {xs: "20px", md: "31px"},
                                            letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                            color: colors.milk,
                                        }}
                                    >Pre order <small>(optional)</small></Typography>

                                    <Box onClick={() => handleSkipPreOrder(releaseData)}
                                        sx={{
                                            padding: "4px 27px",
                                            gap: "10px",
                                            background: colors.primary,
                                            borderRadius: "9px",
                                            display: {xs: "none", md: "initial"},
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: "20px",
                                                lineHeight: "40px",
                                                // letterSpacing: "-0.13px",
                                                color: colors.milk,
                                            }}
                                        > Skip </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", md: "25px"},
                                        // display: "flex",
                                        // flexDirection: "column",
                                        // justifyItems: "center",
                                        // alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13px", sm: "16px", md: "20px"},
                                            // lineHeight: {xs: "20px", md: "31px"},
                                            letterSpacing: "-0.13px",
                                            color: colors.dark,
                                        }}
                                    >
                                        Build excitement by making your ablum or single, or EP 
                                        available for sale before the official release date. 
                                        If you set up a pre-order, you can, market your 
                                        release prior to your release date with a link to purchase. 
                                        In addition to pleasing fans, your pre-order sales also count 
                                        towards your store chart position
                                    </Typography>

                                    <Box mb={3}>
                                        <Stack direction="row" spacing="20px"
                                            justifyContent="space-between" alignItems="center"
                                            sx={{
                                                p: {xs: "10px 10px", md: "10px 15px"},
                                                width: "100%",
                                                border: `1px solid ${colors.tertiary}`,
                                                borderRadius: "12px",
                                                mt: 3, mb: 2,
                                                cursor: "pointer",
                                                bgcolor: preOrderChannel == "None" ? colors.primary : "none"
                                            }}

                                            onClick={() => {
                                                setPreOrderChannel("None")
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "13px", sm: "15px", md: "18px"},
                                                    // lineHeight: "18px",
                                                    // letterSpacing: "-1.05px",
                                                    color: preOrderChannel == "None" ? colors.milk : colors.tertiary,
                                                }}
                                            >None</Typography>

                                            <RadioButtonUncheckedIcon 
                                                sx={{ 
                                                    fontSize: "20px", 
                                                    color: preOrderChannel == "None" ? colors.milk : colors.tertiary,
                                                }}
                                            />
                                        </Stack>

                                        <Stack direction="row" spacing="20px"
                                            justifyContent="space-between" alignItems="center"
                                            sx={{
                                                p: {xs: "10px 10px", md: "10px 15px"},
                                                width: "100%",
                                                color: preOrderChannel == "iTunes" ? colors.milk : colors.tertiary,
                                                bgcolor: preOrderChannel == "iTunes" ? colors.primary : "none",
                                                border: `1px solid ${colors.tertiary}`,
                                                borderRadius: "12px",
                                                cursor: "pointer",
                                            }}

                                            onClick={() => {
                                                setPreOrderChannel("iTunes");
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "13px", sm: "15px", md: "18px"},
                                                    // lineHeight: "18px",
                                                    // letterSpacing: "-1.05px",
                                                    color: preOrderChannel == "iTunes" ? colors.milk : colors.tertiary,
                                                }}
                                            >iTunes</Typography>

                                            <RadioButtonUncheckedIcon 
                                                sx={{ 
                                                    fontSize: "20px", 
                                                    color: preOrderChannel == "iTunes" ? colors.milk : colors.tertiary,
                                                }}
                                            />
                                        </Stack>

                                        { errors.channel && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.channel }</Box> }
                                    </Box>

                                    {
                                        preOrderChannel == "iTunes" ? 
                                            <Box>
                                                <Box
                                                    sx={{
                                                        // maxWidth: {xs: "330px",  sm: "95%", md: "892px"},
                                                        border: {
                                                            xs: `0.45px solid ${ colors.dark }`,
                                                            md: `1px solid ${ colors.dark }`
                                                        },
                                                        borderRadius: {xs: "5.42px", md: "12px"},
                                                        overflow: "hidden",
                                                        // mx: "auto",
                                                        // bgcolor: colors.secondary
                                                        width: "100%"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            height: {xs: "32.53px", md: "72px"},
                                                            bgcolor: colors.tertiary,
                                                            color: colors.milk,
                                                            // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                                            px: {xs: "10px", md: "25px"},
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            gap: "20px",
                                                            justifyContent: "space-between",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: {xs: "13px", sm: "15px", md: "24px"},
                                                                // lineHeight: {xs: "20px", md: "31px"},
                                                                letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                                                color: colors.milk,
                                                            }}
                                                        >Start date</Typography>
            
                                                        <ArrowDropDownIcon sx={{ fontSize: {xs: "20px", sm: "30px", md: "40px"}, color: colors.milk }} />
                                                    </Box>
            
                                                    <Box
                                                        sx={{
                                                            p: {xs: "10px", md: "25px"},
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: {xs: "13px", sm: "16px", md: "20px"},
                                                                // lineHeight: {xs: "20px", md: "31px"},
                                                                letterSpacing: "-0.13px",
                                                                color: colors.dark,
                                                                mb: 2
                                                            }}
                                                        >
                                                            <b>Note: </b> your pre-order start date must be at least one day prior to your sales start date. 
                                                            Today's date must also be at least 10 days prior to your pre-order set date
                                                        </Typography>
            
                                                        <Box
                                                            sx={{
                                                                mb: 2,
                                                                bgcolor: colors.secondary,
                                                                p: "10px",
                                                                borderRadius: "12px",
                                                                border: "1px solid #000000",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", sm: "16px", md: "20px"},
                                                                    // lineHeight: {xs: "20px", md: "31px"},
                                                                    letterSpacing: "-0.13px",
                                                                    color: colors.dark,
                                                                }}
                                                            >
                                                                <b>Tips: </b> We recommend you give yourself ample time between the start of 
                                                                your pre order date and your actual release date, 
                                                                so you can effectively promote your music and generate buzz before it is release
                                                            </Typography>
                                                        </Box>
            
                                                        <Box
                                                            sx={{
                                                                mb: 2,
                                                                bgcolor: colors.secondary,
                                                                p: "10px",
                                                                borderRadius: "12px",
                                                                border: "1px solid #000000",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", sm: "16px", md: "20px"},
                                                                    // lineHeight: {xs: "20px", md: "31px"},
                                                                    letterSpacing: "-0.13px",
                                                                    color: colors.dark,
                                                                }}
                                                            >
                                                                <b>Alert: </b> Please be aware that iTunes reviews a random number of releases 
                                                                for proper formatting and this includes pre-order. 
                                                                If your pre order gets held up in this review, 
                                                                it may take up to three weeks to go live- or even longer around holidays, 
                                                                please consider this as you set up your pre-order and release date
                                                            </Typography>
                                                        </Box>
            
                                                        <Box
                                                            sx={{
                                                                mb: 2,
                                                                // bgcolor: colors.secondary,
                                                                p: "10px",
                                                                borderRadius: "12px",
                                                                border: "1px solid #000000",
                                                            }}
                                                        >
                                                            <Grid container spacing="10px" my={2}>
                                                                <Grid item xs={12} sm={5} md={4} lg={3}
                                                                    sx={{ alignSelf: "center"}}
                                                                >
                                                                    <Typography variant='h3' sx={{
                                                                        fontWeight: {xs: "700", md: "700"},
                                                                        fontSize: {xs: "13px", sm: "16px", lg: "18px"},
                                                                        // lineHeight: {xs: "21px", md: "32px"},
                                                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"},
                                                                    }}> Pre order start date: </Typography>
                                                                </Grid>
            
                                                                <Grid item xs={12} sm={7} md={8} lg={9}
                                                                    sx={{ alignSelf: "center" }}
                                                                >
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <DemoContainer components={['DatePicker']}>
                                                                            <DatePicker label="Start Date" format="DD/MM/YYYY"
                                                                                value={dayjs(preOrderDate)}

                                                                                minDate={dayjs(minReleaseDate(releaseData.releaseDate, -10))}
                                                                                maxDate={dayjs(minReleaseDate(releaseData.releaseDate, 0))}
            
                                                                                onChange={(newValue) => {
                                                                                    const value = dayjs(newValue).format('YYYY/MM/DD');
                                                                                    // console.log(value);
                                                                                    setPreOrderDate(value);
                                                                                }}
                                                                            />
                                                                        </DemoContainer>
                                                                    </LocalizationProvider>
            
                                                                    { errors.preOrderDate && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.preOrderDate }</Box> }
                                                                </Grid>
                                                            </Grid>
            
            
                                                            <Grid container spacing="10px" my={2}>
                                                                <Grid item xs={12} sm={5} md={4} lg={3}
                                                                    sx={{ alignSelf: "center"}}
                                                                >
                                                                    <Typography variant='h3' sx={{
                                                                        fontWeight: {xs: "700", md: "700"},
                                                                        fontSize: {xs: "13px", sm: "16px", lg: "18px"},
                                                                        // lineHeight: {xs: "21px", md: "32px"},
                                                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"},
                                                                    }}> Album sales start date: </Typography>
                                                                </Grid>
            
                                                                <Grid item xs={12} sm={7} md={8} lg={9}
                                                                    sx={{ alignSelf: "center" }}
                                                                >
                                                                    <Stack direction="row" spacing="10px" alignItems="center">
                                                                        <Typography
                                                                            sx={{
            
                                                                            }}
                                                                        >{ dayjs(releaseData.releaseDate).format('DD/MM/YYYY') }</Typography>
            
                                                                        <Typography 
                                                                            onClick={() => setReleaseDateModal(true)}
                                                                            sx={{
                                                                                fontStyle: "italic",
                                                                                fontWeight: "400",
                                                                                fontSize: "16px",
                                                                                lineHeight: "24px",
                                                                                // letter-spacing: -0.13px;
                                                                                color: colors.primary,
                                                                                cursor: "pointer",
                                                                                width: "fit-content"
                                                                            }}
                                                                        >Change</Typography>
                                                                    </Stack>
            
                                                                    { errors.releaseDate && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.releaseDate }</Box> }
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
            
                                                        <Box>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", sm: "16px", md: "20px"},
                                                                    // lineHeight: {xs: "20px", md: "31px"},
                                                                    letterSpacing: "-0.13px",
                                                                    color: colors.dark,
                                                                }}
                                                            >
                                                                After your release is delivered, most release take 24-74 hours to go live in stores. 
                                                                However a random percentage of release delivered to iTunes go through an internal 
                                                                store review process which can take up to 16 business days from the day that they are receieved by iTunes
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
            
                                                <Box
                                                    sx={{
                                                        // maxWidth: {xs: "330px",  sm: "95%", md: "892px"},
                                                        border: {
                                                            xs: `0.45px solid ${ colors.dark }`,
                                                            md: `1px solid ${ colors.dark }`
                                                        },
                                                        borderRadius: {xs: "5.42px", md: "12px"},
                                                        overflow: "hidden",
                                                        // mx: "auto",
                                                        my: 3,
                                                        // bgcolor: colors.secondary
                                                        width: "100%"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            height: {xs: "32.53px", md: "72px"},
                                                            bgcolor: colors.tertiary,
                                                            color: colors.milk,
                                                            // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                                            px: {xs: "10px", md: "25px"},
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            gap: "20px",
                                                            justifyContent: "space-between",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: {xs: "13px", sm: "15px", md: "24px"},
                                                                // lineHeight: {xs: "20px", md: "31px"},
                                                                letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                                                color: colors.milk,
                                                            }}
                                                        >Pre-order Track preview <small> (optional)</small> </Typography>
            
                                                        <ArrowDropDownIcon sx={{ fontSize: {xs: "20px", sm: "30px", md: "40px"}, color: colors.milk }} />
                                                    </Box>
            
                                                    <Box
                                                        sx={{
                                                            p: {xs: "10px", md: "25px"},
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "700",
                                                                fontSize: {xs: "13px", sm: "16px", md: "18px"},
                                                                // lineHeight: {xs: "20px", md: "31px"},
                                                                letterSpacing: "-0.13px",
                                                                color: colors.dark,
                                                                mb: 2,
                                                            }}
                                                        > Select a track you would like your fans to preview </Typography>
            
                                                        <Box>
                                                            <FormControl>
                                                                {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                                                
                                                                <RadioGroup
                                                                    // aria-labelledby="demo-radio-buttons-group-label"
                                                                    // defaultValue="female"
                                                                    value={handleSelectedTrack(releaseData)}
                                                                    name="radio-buttons-group"
                                                                    onChange={(_e, newValue) => {
                                                                        const value = Number(newValue);
                                                                        // console.log(value);
                                                                        setPreOrderTrackPreview(releaseData.songs[value]);
                                                                    }}
                                                                >
                                                                    {
                                                                        releaseData.songs.map((song, index) => (
                                                                            <FormControlLabel key={song._id}
                                                                                value={index}
                                                                                // label="Female" 
                                                                                label={`${index + 1}. ${song.songTitle}`}
                                                                                control={<Radio sx={{
                                                                                    color: colors.tertiary,
                                                                                    '&.Mui-checked': {
                                                                                        color: colors.primary,
                                                                                    }
                                                                                }} />} 
                                                                            />
                                                                        ))
                                                                    }
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Box>
            
                                                        { errors.trackPreview && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.trackPreview }</Box> }
                                                    </Box>
                                                </Box>
            
                                                {/* iTunes Options */}
                                                {/* <Box
                                                    sx={{
                                                        // maxWidth: {xs: "330px",  sm: "95%", md: "892px"},
                                                        border: {
                                                            xs: `0.45px solid ${ colors.dark }`,
                                                            md: `1px solid ${ colors.dark }`
                                                        },
                                                        borderRadius: {xs: "5.42px", md: "12px"},
                                                        overflow: "hidden",
                                                        // mx: "auto",
                                                        mt: 2,
                                                        // bgcolor: colors.secondary
                                                        width: "100%"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            height: {xs: "32.53px", md: "72px"},
                                                            bgcolor: colors.tertiary,
                                                            color: colors.milk,
                                                            // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                                            px: {xs: "10px", md: "25px"},
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            gap: "20px",
                                                            justifyContent: "space-between",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "600",
                                                                fontSize: {xs: "13px", sm: "15px", md: "24px"},
                                                                // lineHeight: {xs: "20px", md: "31px"},
                                                                letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                                                color: colors.milk,
                                                            }}
                                                        >iTunes Options</Typography>
            
                                                        <ArrowDropDownIcon sx={{ fontSize: {xs: "20px", sm: "30px", md: "40px"}, color: colors.milk }} />
                                                    </Box>
            
                                                    <Box
                                                        sx={{
                                                            p: {xs: "10px", md: "25px"},
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: {xs: "13px", sm: "16px", md: "20px"},
                                                                // lineHeight: {xs: "20px", md: "31px"},
                                                                letterSpacing: "-0.13px",
                                                                color: colors.dark,
                                                                mb: 2,
                                                            }}
                                                        >
                                                            You can offer fans a special pre-order price that is lower than the 
                                                            sales start date price. Our pricing calculator below automatically 
                                                            shows you which retail prices are available to you based on the 
                                                            number of Instant Gratification tracks you've selected and the 
                                                            iTunes pricing guidelines that we follow. 
                                                            When you change the price, it affects all iTunes Stores Worldwide. 
                                                            iTunes has its own exchange rate, exchanged from USD, and pricing 
                                                            guidelines are also based on US pricing. <a target='_blank'
                                                                href="https://itunespartner.apple.com/music/support/5222-rights-pricing-basics" 
                                                                style={{
                                                                    textDecoration: "none", 
                                                                    fontWeight: "400",
                                                                    fontSize: "inherit",
                                                                    color: colors.primary,
                                                                }}
                                                            > Learn iTunes pricing guidelines.</a>
                                                            
                                                        </Typography>
            
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: {xs: "13px", sm: "16px", md: "20px"},
                                                                // lineHeight: {xs: "20px", md: "31px"},
                                                                letterSpacing: "-0.13px",
                                                                color: colors.dark,
                                                                mb: 2
                                                            }}
                                                        >
                                                            <b>Note: </b> We allow you to choose your wholesale price, 
                                                            which is what Apple will pay you for each sale. 
                                                            Exact retail price will be automatically generated based on the 
                                                            wholesale prices that you select.
                                                        </Typography>
            
                                                        <Box>
                                                            <Grid container spacing="10px">
                                                                <Grid item xs={12} sm={5} md={4} lg={3}
                                                                    sx={{ alignSelf: "center"}}
                                                                >
                                                                    <Typography variant='h3' sx={{
                                                                        fontWeight: {xs: "700", md: "700"},
                                                                        fontSize: {xs: "13px", sm: "16px", lg: "18px"},
                                                                        // lineHeight: {xs: "21px", md: "32px"},
                                                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"},
                                                                    }}> Individual track price: </Typography>
                                                                </Grid>
            
                                                                <Grid item xs={12} sm={7} md={8} lg={9}
                                                                    sx={{ alignSelf: "center" }}
                                                                >
                                                                    <TextField 
                                                                        variant="outlined" 
                                                                        fullWidth size='small'
                                                                        type='text'
                                                                        label=''
                                                                        inputMode='text'
                                                                        // defaultValue={albumRelease.title || ""}
                                                                        defaultValue=''
                                                                        // InputProps={{
                                                                        //     sx: {
                                                                        //         borderRadius: "16px",
                                                                        //         maxWidth: {xs: "337px", md: "100%"}
                                                                        //     },
                                                                        // }}
                                                                        // sx={releaseTextFieldStyle}
                                                                        // error={ errors.albumTitle ? true : false }
                                                                    />
                                                                </Grid>
                                                            </Grid>
            
                                                            <Grid container spacing="10px" mt={1}>
                                                                <Grid item xs={12} sm={5} md={4} lg={3}
                                                                    sx={{ alignSelf: "center"}}
                                                                >
                                                                    <Typography variant='h3' sx={{
                                                                        fontWeight: {xs: "700", md: "700"},
                                                                        fontSize: {xs: "13px", sm: "16px", lg: "18px"},
                                                                        // lineHeight: {xs: "21px", md: "32px"},
                                                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"},
                                                                    }}> Pre-order price: </Typography>
                                                                </Grid>
            
                                                                <Grid item xs={12} sm={7} md={8} lg={9}
                                                                    sx={{ alignSelf: "center" }}
                                                                >
                                                                    <TextField 
                                                                        variant="outlined" 
                                                                        fullWidth size='small'
                                                                        type='text'
                                                                        label=''
                                                                        inputMode='text'
                                                                        // defaultValue={albumRelease.title || ""}
                                                                        defaultValue=''
                                                                        // InputProps={{
                                                                        //     sx: {
                                                                        //         borderRadius: "16px",
                                                                        //         maxWidth: {xs: "337px", md: "100%"}
                                                                        //     },
                                                                        // }}
                                                                        // sx={releaseTextFieldStyle}
                                                                        // error={ errors.albumTitle ? true : false }
                                                                    />
                                                                </Grid>
                                                            </Grid>
            
                                                            <Grid container spacing="10px" mt={1}>
                                                                <Grid item xs={12} sm={5} md={4} lg={3}
                                                                    sx={{ alignSelf: "center"}}
                                                                >
                                                                    <Typography variant='h3' sx={{
                                                                        fontWeight: {xs: "700", md: "700"},
                                                                        fontSize: {xs: "13px", sm: "16px", lg: "18px"},
                                                                        // lineHeight: {xs: "21px", md: "32px"},
                                                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"},
                                                                    }}> Sales start date price: </Typography>
                                                                </Grid>
            
                                                                <Grid item xs={12} sm={7} md={8} lg={9}
                                                                    sx={{ alignSelf: "center" }}
                                                                >
                                                                    <Typography
                                                                    >$0.00USD</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                </Box> */}
                                            </Box>
                                        : <Box>

                                            <Box
                                                sx={{
                                                    // maxWidth: {xs: "330px",  sm: "95%", md: "892px"},
                                                    border: {
                                                        xs: `0.45px solid ${ colors.dark }`,
                                                        md: `1px solid ${ colors.dark }`
                                                    },
                                                    borderRadius: {xs: "5.42px", md: "12px"},
                                                    overflow: "hidden",
                                                    // mx: "auto",
                                                    // bgcolor: colors.secondary
                                                    width: "100%"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: {xs: "32.53px", md: "72px"},
                                                        bgcolor: colors.tertiary,
                                                        color: colors.milk,
                                                        // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                                        px: {xs: "10px", md: "25px"},
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: "20px",
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "600",
                                                            fontSize: {xs: "13px", sm: "15px", md: "24px"},
                                                            // lineHeight: {xs: "20px", md: "31px"},
                                                            letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                                            color: colors.milk,
                                                        }}
                                                    >Start date</Typography>
        
                                                    <ArrowDropDownIcon sx={{ fontSize: {xs: "20px", sm: "30px", md: "40px"}, color: colors.milk }} />
                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    // maxWidth: {xs: "330px",  sm: "95%", md: "892px"},
                                                    border: {
                                                        xs: `0.45px solid ${ colors.dark }`,
                                                        md: `1px solid ${ colors.dark }`
                                                    },
                                                    borderRadius: {xs: "5.42px", md: "12px"},
                                                    overflow: "hidden",
                                                    // mx: "auto",
                                                    // bgcolor: colors.secondary
                                                    width: "100%",
                                                    mt: 2
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: {xs: "32.53px", md: "72px"},
                                                        bgcolor: colors.tertiary,
                                                        color: colors.milk,
                                                        // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                                        px: {xs: "10px", md: "25px"},
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: "20px",
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "600",
                                                            fontSize: {xs: "13px", sm: "15px", md: "24px"},
                                                            // lineHeight: {xs: "20px", md: "31px"},
                                                            letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                                            color: colors.milk,
                                                        }}
                                                    >Pre-order Track preview <small> (optional)</small> </Typography>
        
                                                    <ArrowDropDownIcon sx={{ fontSize: {xs: "20px", sm: "30px", md: "40px"}, color: colors.milk }} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    }
                                </Box>
                            </Box>

                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Box mt="100px">
                                <Stack direction="row" justifyContent="space-between" spacing="20px" alignItems="center">
                                    <Button variant="contained" 
                                        fullWidth type='button'
                                        onClick={() => navigate(-1)}
                                        sx={{ 
                                            bgcolor: "#9c9c9c",
                                            maxWidth: "312px",
                                            color: "#fff",
                                            "&.Mui-disabled": {
                                                background: "#9c9c9c",
                                                color: "#797979"
                                            },
                                            "&:hover": {
                                                bgcolor: "#4C4C4C57",
                                            },
                                            "&:active": {
                                                bgcolor: "#4C4C4C57",
                                            },
                                            "&:focus": {
                                                bgcolor: "#4C4C4C57",
                                            },
                                            borderRadius: "12px",
                                            my: 3, py: 1.5,
                                            fontSize: {md: "15.38px"},
                                            fontWeight: "900",
                                            letterSpacing: "-0.12px",
                                            textTransform: "none"
                                        }}
                                    > Previous step </Button>

                                    <Button variant="contained" 
                                        fullWidth type="button" 
                                        // disabled={ errors.status } 
                                        sx={{ 
                                            bgcolor: colors.primary,
                                            color: colors.milk,
                                            maxWidth: "312px",
                                            "&.Mui-disabled": {
                                                background: "#9c9c9c",
                                                color: "#797979"
                                            },
                                            "&:hover": {
                                                bgcolor: colors.primary,
                                            },
                                            "&:active": {
                                                bgcolor: colors.primary,
                                            },
                                            "&:focus": {
                                                bgcolor: colors.primary,
                                            },
                                            borderRadius: "12px",
                                            // my: 3, 
                                            py: 1.5,
                                            fontSize: {md: "15.38px"},
                                            fontWeight: "900",
                                            letterSpacing: "-0.12px",
                                            textTransform: "none"
                                        }}
                                        onClick={() => handleContineBtn() }
                                    > Continue </Button>
                                </Stack>
                            </Box>
                        </Box>
                    : <LoadingDataComponent />
                }
            </Box>

            {
                releaseData ?
                    <ChangeReleaseDateComponent 
                        release_date={releaseData.releaseDate}
                        // release_id={release_id || releaseData._id || ''}
                        openModal={releaseDateModal}
                        closeModal={() => setReleaseDateModal(false)}
                        setNewReleaseDate={(value) => {
                            updateReleaseDateById(
                                release_id || releaseData._id || '',
                                value,
                                () => {
                                    setReleaseDateModal(false);
                                }
                            ).finally(() => setReleaseDateModal(false))
                        }}
                    />
                : <></>
            }


            <SuccessModalComponent 
                openModal={openSuccessModal}
                closeModal={() => setOpenSuccessModal(false)}
            />
        </AccountWrapper>
    )
}

export default PreOrderPage