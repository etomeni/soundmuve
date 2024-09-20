import { create } from "zustand";
import temptCoverPhotoImg from '@/assets/images/album.png';


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

type _typeInterface_ = {
    songDetails: typeof songDetails;

    _setSongDetails : (details: typeof songDetails) => void;
    // _setAlbumReleaseDetails : (details: typeof albumReleaseDetails) => void;

    // updatePlayerAsync: () => Promise<void>;
};
  

export const useReleaseStore = create<_typeInterface_>((set) => ({
    songDetails,
  
    _setSongDetails: (details) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                songDetails: details,
            };
        });
    },

}));
  