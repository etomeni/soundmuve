import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    const _setAlbumDetails = useReleaseStore((state) => state._setAlbumDetails);

    const handleNavigation = () => {
        // Single" | "Album"
        navigate(`/account/artist/${albumType == "Album" ? "album-details" : "song-details"}`);
        let song_id = song.songs ? song?.songs[index]._id : song._id;


        if (albumType == "Album") {
            let songs_: any[] = [];
            song.songs?.forEach((item) => {
                const songs_Item = {
                    _id: item._id,
                    artist_name: song.artist_name,
                    cover_photo: song.song_cover || song.song_cover_url || albumImage,
                    email: item.email || song.email,
                    label_name: song.label_name,
                    primary_genre: song.primary_genre,
                    secondary_genre: song.secondary_genre,
                    song_title: item.song_title || '',
                    stream_time: '',
                    streams: "",
                    total_revenue: "",
                    upc_ean: item.upc_ean || item.isrc_number || ''
                };

                songs_.push(songs_Item);
            });

            _setAlbumDetails({
                _id: song._id,
                email: song.email,
                appleMusicUrl: song.appleMusicUrl,
                spotifyMusicUrl: song.spotifyMusicUrl,
                album_title: song.album_title || '',
                artist_name: song.artist_name,
                language: song.language,
                primary_genre: song.primary_genre,
                secondary_genre: song.secondary_genre,
                release_date: song.release_date,
                release_time: song.release_time,
                listenerTimeZone: song.listenerTimeZone,
                otherTimeZone: song.otherTimeZone,
                label_name: song.label_name,
                soldWorldwide: song.soldWorldwide,
                recording_location: song.recording_location,
                upc_ean: song.upc_ean,
                store: song.store,
                social_platform: song.social_platform,
                status: song.status,
                song_cover_url: song.song_cover_url || song.song_cover || albumImage,

                created_at: song.created_at,
                songs: songs_,
                numberOfSongs: song.numberOfSongs || 0,
            
                total_revenue: '', // $60,000.00
                streams: '', // 80,000,000
                stream_time: '', // 120hrs
            })
        } else if (albumType == "Single") {
                
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
        } else {
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
        }
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

                
                // navigate(`/account/artist/${albumType == "Album" ? "album-details" : "song-details"}`);
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

