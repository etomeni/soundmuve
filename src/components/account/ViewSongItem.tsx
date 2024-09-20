import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import albumImage from '@/assets/images/album.png';

import { releaseInterface } from '@/constants/typesInterface';
import { useReleaseStore } from '@/state/releaseStore';
import ReleaseStatusComponent from '../ReleaseStatus';

interface _Props {
    // children: React.ReactNode,
    song: releaseInterface, 
    index: number,
    albumType: string
}


const ViewSongItemComponent: React.FC<_Props> = ({ song, index, albumType }) => {
    const navigate = useNavigate();
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    return (
        <Grid item xs={6} md={4} key={index}>
            <Box 
                sx={{ 
                    width: "100%",
                    maxWidth: {xs: "196.38px", md: "345px"},
                    mx: "auto"
                }}
                onClick={() => {
                    navigate(`/account/artist/${albumType == "Album" ? "album-details" : "song-details"}`);
                    let song_id = song.songs ? song?.songs[index]._id : song._id;

                    _setSongDetails({
                        _id: song_id,
                        artist_name: song.artist_name,
                        cover_photo: song.song_cover || song.song_cover_url || albumImage,
                        email: song.email,
                        label_name: song.label_name,
                        primary_genre: song.primary_genre,
                        secondary_genre: song.secondary_genre,
                        song_title: song.album_title || song.song_title || '',
                        stream_time: '',
                        streams: "",
                        total_revenue: "",
                        upc_ean: song.upc_ean
                    });
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
                            src={ song.song_cover || song.song_cover_url || albumImage } 
                            alt={`${song.song_title} song cover`}
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
                > { song.song_title } </Typography>

                <Typography
                    sx={{
                        display: albumType == "Album" ? "block" : "none",
                        fontWeight: "400",
                        fontSize: {xs: "8.02px", md: "15px"},
                        lineHeight: {xs: "12.83px", md: "24px"},
                        // letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                        color: "#979797",
                        mb: {md: 1}
                    }}
                > Album </Typography>

                <ReleaseStatusComponent status={song.status} />
            </Box>
        </Grid>
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

