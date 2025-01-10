import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import albumImage from '@/assets/images/album.png';

import { useReleaseStore } from '@/state/releaseStore';
import ReleaseStatusComponent from '../ReleaseStatus';
import { releaseInterface } from '@/typeInterfaces/release.interface';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { useCart } from '@/hooks/useCart';


interface _Props {
    // children: React.ReactNode,
    releaseDetails: releaseInterface, 
    index: number,
    releaseType: string
}

const ViewSongItemComponent: React.FC<_Props> = ({ releaseDetails, releaseType }) => {
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

            navigate(`/account/${releaseDetails.releaseType == "album" ? "create-album-release-details" : "create-single-release"}`);

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
                maxWidth: {xs: "196.38px", md: "345px"},
                mx: "auto"
            }}
            onClick={() => {
                handleNavigation();
                // return;

                
                // navigate(`/account/analytics/${albumType == "Album" ? "album-details" : "song-details"}`);
                // let song_id = song.songs ? song?.songs[index]._id : song._id;

                // _setSongDetails({
                //     _id: song_id,
                //     artist_name: song.artist_name,
                //     cover_photo: song.song_cover || song.song_cover_url || albumImage,
                //     email: song.email,
                //     label_name: song.label_name,
                //     primary_genre: song.primary_genre,
                //     secondary_genre: song.secondary_genre,
                //     song_title: song.album_title || song.song_title || '',
                //     stream_time: '',
                //     streams: "",
                //     total_revenue: "",
                //     upc_ean: song.upc_ean
                // });
            }}
        >
            <Box
                sx={{
                    // width: "100%",
                    // maxWidth: {xs: "196.38px", md: "345px"},
                    height: {xs: "152.99px", md: "268px"},
                    borderRadius: {xs: "6.85px", md: "12px"},
                    bgcolor: "#343434",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box 
                    sx={{
                        width: {xs: "124.48px", md: "218.06px"},
                        height: {xs: "124.48px", md: "218.06px"}
                    }}
                >
                    <img
                        src={ releaseDetails.coverArt || albumImage } 
                        alt={`${releaseDetails.title} song cover art work`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Box>
            </Box>

            <Typography
                sx={{
                    fontWeight: "900",
                    fontSize: {xs: "10.85px", md: "19px"},
                    lineHeight: {xs: "13.7px", md: "24px"},
                    letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                    // color: "#fff",
                    m: {xs: "8px 0 0 0", md: "8px 0 8px 0"}
                }}
            > { releaseDetails.title } </Typography>

            <Typography
                sx={{
                    display: releaseType == "Album" ? "block" : "none",
                    fontWeight: "400",
                    fontSize: {xs: "8.02px", md: "15px"},
                    lineHeight: {xs: "12.83px", md: "24px"},
                    // letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                    color: "#979797",
                    mb: {md: 1}
                }}
            > Album </Typography>

            <ReleaseStatusComponent status={releaseDetails.status} />
        </Box>
    )
}

export default ViewSongItemComponent;


    // const songView = (song: any, index: number) => (
    //     <Grid item xs={6} md={4} key={index}>
    //         <Box sx={{ width: "95%" }}>
    //             <Box
    //                 sx={{
    //                     height: {xs: "152.99px", md: "268px"},
    //                     borderRadius: {xs: "6.85px", md: "12px"},
    //                     bgcolor: "#343434",
    //                     textAlign: "center",
    //                     display: "flex",
    //                     justifyContent: "center",
    //                     alignItems: "center"
    //                 }}
    //             >
    //                 <Box 
    //                     sx={{
    //                         width: {xs: "124.48px", md: "218.06px"},
    //                         height: {xs: "124.48px", md: "218.06px"}
    //                     }}
    //                 >
    //                     <img
    //                         src={song.song_cover} alt={`${song.song_title} song cover`}
    //                         style={{
    //                             width: "100%",
    //                             height: "100%",
    //                             objectFit: "contain"
    //                         }}
    //                     />
    //                 </Box>
    //             </Box>

    //             <Typography
    //                 sx={{
    //                     fontWeight: "900",
    //                     fontSize: {xs: "10.85px", md: "19px"},
    //                     lineHeight: {xs: "13.7px", md: "24px"},
    //                     letterSpacing: {xs: "-0.77px", md: "-1.34px"},
    //                     // color: "#fff",
    //                     my: {xs: "8px 0 0 0", md: "8px 0 8px 0"}
    //                 }}
    //             > { song.song_title } </Typography>


    //             <Typography
    //                 sx={{
    //                     display: albumType == "Album" ? "block" : "none",
    //                     fontWeight: "400",
    //                     fontSize: {xs: "8.02px", md: "15px"},
    //                     lineHeight: {xs: "12.83px", md: "24px"},
    //                     // letterSpacing: {xs: "-0.77px", md: "-1.34px"},
    //                     color: "#979797",
    //                     mb: {md: 1}
    //                 }}
    //             > Album </Typography>

    //             <ReleaseStatusComponent status={song.status} />

    //         </Box>
    //     </Grid>
    // );

