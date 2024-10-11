import { create } from "zustand";
import temptCoverPhotoImg from '@/assets/images/album.png';
// import { releaseInterface } from "@/constants/typesInterface";

const songDetails = {
    _id: "",
    email: "",
    // release_type: "",
    song_title: "", // Sensami
    artist_name: "", //Skiibii

    cover_photo: temptCoverPhotoImg,

    // language: 'Select Language',
    primary_genre: '', // Dance
    secondary_genre: '', // Alternative

    label_name: "", // More Grace Music
    upc_ean: "", // 123456789

    total_revenue: '', // $60,000.00
    streams: '', // 80,000,000
    stream_time: '', // 120hrs
}

const albumDetails = {
    _id: '',
    email: '',
    appleMusicUrl: '',
    spotifyMusicUrl: '',
    album_title: '',
    artist_name: '',
    language: '',
    primary_genre: '',
    secondary_genre: '',
    release_date: '',
    release_time: '',
    listenerTimeZone: '',
    otherTimeZone: '',
    label_name: '',
    soldWorldwide: '',
    recording_location: '',
    upc_ean: '',
    store: '',
    social_platform: '',
    status: '',
    song_cover_url: '',
    created_at: '',
    songs:<typeof songDetails[]> [],
    numberOfSongs: 0,

    total_revenue: '', // $60,000.00
    streams: '', // 80,000,000
    stream_time: '', // 120hrs
}


type _typeInterface_ = {
    songDetails: typeof songDetails;
    albumDetails: typeof albumDetails;

    _setSongDetails : (details: typeof songDetails) => void;
    _setAlbumDetails : (details: typeof albumDetails) => void;

    // updatePlayerAsync: () => Promise<void>;
};
  

export const useReleaseStore = create<_typeInterface_>((set) => ({
    songDetails, albumDetails,
  
    _setSongDetails: (details) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                songDetails: details,
            };
        });
    },
  
    _setAlbumDetails: (details) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                albumDetails: details,
            };
        });
    },

}));
  