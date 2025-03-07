import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import albumImage from '@/assets/images/album.png';

import { useReleaseStore } from '@/state/releaseStore';
import ReleaseStatusComponent from '../ReleaseStatus';
import { releaseInterface } from '@/typeInterfaces/release.interface';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { useCart } from '@/hooks/useCart';
import colors from '@/constants/colors';
import { useGetReleases } from '@/hooks/release/useGetReleases';
import ConfirmationDialog from '../ConfirmationDialog';


interface _Props {
    // children: React.ReactNode,
    releaseDetails: releaseInterface,
    getAllReleases: () => void,
    releaseType: string
}

const ViewSongItemComponent: React.FC<_Props> = ({ releaseDetails, releaseType, getAllReleases }) => {
    const navigate = useNavigate();
    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const _handleSetSingleRelease = useCreateReleaseStore((state) => state._handleSetSingleRelease1);
    const _handleSetAlbumRelease = useCreateReleaseStore((state) => state._handleSetAlbumRelease);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    const { handleCheckReleaseCart } = useCart();

    const handleNavigation = async () => {
        // console.log(index);
        _setReleaseDetails(releaseDetails);

        const song = releaseDetails.songs[0];
        if (releaseDetails.songs.length) _setSongDetails(song);

        if (releaseDetails.status == "Incomplete") {
            if (releaseDetails.releaseType == "album") {
                _handleSetAlbumRelease(releaseDetails);
            }

            if (releaseDetails.releaseType == "single") {
                _handleSetSingleRelease(releaseDetails);
            }

            navigate({
                pathname: `/account/${releaseDetails.releaseType == "album" ? "create-album-release-details" : "create-single-release"}`,
                search: `?${createSearchParams({
                    release_id: releaseDetails._id || ''
                })}`,
            });
            return;
        }

        if (releaseDetails.status == "Unpaid") {
            // check if the item is still in cart
            // if not add it to cart else proceed

            // if it returns any error do nothing else navigate to the cart page.

            const releaseCartData = {
                release_id: releaseDetails._id || '',
                user_email: releaseDetails.email,
                user_id: releaseDetails.user_id || '',
                artistName: releaseDetails.mainArtist.spotifyProfile.name,
                coverArt: releaseDetails.coverArt,
                price: releaseDetails.releaseType == "album" ? 45 : 25,
                preSaveAmount: releaseDetails.preOrder?.status ? 20 : 0,
                releaseType: releaseDetails.releaseType,
                title: releaseDetails.title
            };

            const response = await handleCheckReleaseCart(releaseCartData);
            if (response) navigate(`/account/cart`);
            return;
        }

        // Single" | "Album"
        const url = `/account/analytics/${releaseType == "Album" ? "album-details" : "song-details"}`;
        const params = {
            releaseId: releaseDetails._id || '',
            songId: song._id || ''
        };
        navigate({
            pathname: url,
            search: `?${createSearchParams(params)}`,
        });
    };


    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: { xs: "196.38px", md: "345px" },
                mx: "auto"
            }}
        >
            <Box
                sx={{
                    // width: "100%",
                    // maxWidth: {xs: "196.38px", md: "345px"},
                    height: { xs: "152.99px", md: "268px" },
                    borderRadius: { xs: "6.85px", md: "12px" },
                    bgcolor: "#343434",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
                    <SongItemMenu 
                        release={releaseDetails} 
                        getRelease={() => getAllReleases()}
                    />
                </Box>

                <Box onClick={() => { handleNavigation(); }}
                    sx={{
                        width: { xs: "124.48px", md: "218.06px" },
                        height: { xs: "124.48px", md: "218.06px" },
                        cursor: "pointer"
                    }}
                >
                    <img
                        src={releaseDetails.coverArt || albumImage}
                        alt={`${releaseDetails.title} song cover art work`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Box>
            </Box>

            <Typography onClick={() => { handleNavigation(); }}
                sx={{
                    fontWeight: "900",
                    fontSize: { xs: "10.85px", md: "19px" },
                    lineHeight: { xs: "13.7px", md: "24px" },
                    letterSpacing: { xs: "-0.77px", md: "-1.34px" },
                    // color: "#fff",
                    m: { xs: "8px 0 0 0", md: "8px 0 8px 0" },
                    cursor: "pointer",
                    width: "fit-content"
                }}
            > {releaseDetails.title} </Typography>

            <Typography
                sx={{
                    display: releaseType == "Album" ? "block" : "none",
                    fontWeight: "400",
                    fontSize: { xs: "8.02px", md: "15px" },
                    lineHeight: { xs: "12.83px", md: "24px" },
                    // letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                    color: "#979797",
                    mb: { md: 1 }
                }}
            > Album </Typography>

            <ReleaseStatusComponent status={releaseDetails.status} />
        </Box>
    )
}

export default ViewSongItemComponent;



interface SongItem_Props {
    release: releaseInterface,
    getRelease: () => void,
}
const SongItemMenu: React.FC<SongItem_Props> = ({ release, getRelease }) => {
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const _handleSetSingleRelease = useCreateReleaseStore((state) => state._handleSetSingleRelease1);
    const _handleSetAlbumRelease = useCreateReleaseStore((state) => state._handleSetAlbumRelease);
    // const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    const { handleCheckReleaseCart } = useCart();
    const { deleteReleaseById } = useGetReleases();

    const [isLoading, setIsLoading] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({
		action: () => {},
		state: false,
		title: '',
		description: '',
	});

    const handleViewReleaseDetails = () => {
        _setReleaseDetails(release);

        navigate({
            pathname: `/account/release/overview/${release._id}`,
            search: `?${createSearchParams({
                release_id: release._id || ''
            })}`,
        });

        handleClose();
    }

    const ViewSongAnalytics = async () => {
        const releaseCartData = {
            release_id: release._id || '',
            user_email: release.email,
            user_id: release.user_id || '',
            artistName: release.mainArtist.spotifyProfile.name,
            coverArt: release.coverArt,
            price: release.releaseType == "album" ? 45 : 25,
            preSaveAmount: release.preOrder?.status ? 20 : 0,
            releaseType: release.releaseType,
            title: release.title
        };

        const response = await handleCheckReleaseCart(releaseCartData);
        if (response) navigate(`/account/cart`);

        handleClose();
        return;
    }

    const handleEdit = () => {
        if (release.releaseType == "album") {
            _handleSetAlbumRelease(release);
        }

        if (release.releaseType == "single") {
            _handleSetSingleRelease(release);
        }

        navigate({
            pathname: `/account/${release.releaseType == "album" ? "create-album-release-details" : "create-single-release"}`,
            search: `?${createSearchParams({
                release_id: release._id || ''
            })}`,
        });

        handleClose();
        return;
    }

    const handleDelete = () => {
        setDialogData({
            action: async () => {
                setIsLoading(true);
                setDialogData({
                    action: () => {},
                    state: false,
                    title: '',
                    description: '',
                });

                await deleteReleaseById(
                    `${release._id}`,
                    () => {
                        getRelease();
                        // setIsLoading(false);
                    }    
                );
                setIsLoading(false);
            },
            state: true,
            title: 'Confirm',
            description: 'Are you sure, you want to proceed with deleting this release?',
        });
  

        handleClose();
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ bgcolor: colors.dark }}
            >
                <MoreVertIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            // width: '20ch',
                        },
                    },
                }}
            >
                {
                    release.status != "Incomplete" &&
                    <MenuItem onClick={handleViewReleaseDetails}>
                        View details
                    </MenuItem>
                }

                {
                    release.status == "Live" || release.status == "Pre-Saved" || release.status == "Processing" &&
                    <MenuItem onClick={ViewSongAnalytics}>
                        View analytics
                    </MenuItem>
                }
                
                { 
                    release.status == "Incomplete" || release.status == "Unpaid" &&
                    <MenuItem onClick={handleEdit}
                    > Edit </MenuItem>
                }

                {
                    release.status == "Incomplete" || release.status == "Unpaid" &&
                    <MenuItem onClick={handleDelete}
                        sx={{ 
                            bgcolor: "#A80D05",
                            color: "#fff",
                            ":hover": {
                                bgcolor: "#701920",
                            },
                        }}
                    > Delete </MenuItem>
                }
            </Menu>

			<ConfirmationDialog 
				actionYes={() => {
					dialogData.action();
				}}
				isSubmitting={isLoading}
				openDialog={dialogData.state}
				setOpenDialog={() => {
					setDialogData({
						action: () => {},
						state: false,
						title: '',
						description: '',
					});
                    setIsLoading(false);
				}}
                title={dialogData.title}
                description={dialogData.description}
			/>
        </div>
    );
}
