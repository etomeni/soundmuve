import { getLocalStorage, removeLocalStorageItem, setLocalStorage } from "@/util/storage";
import { create } from "zustand";


interface creativeType {
    creativeName: string,
    creativeRole: string,
}

const singleRelease1 = {
    _id: '',
    email: "",
    release_type: "",
    song_title: "",
    artist_name: "",

    appleMusicUrl: '',
    spotifyMusicUrl: '',

    selectedArtistName: <any> {},

    explicitLyrics: "",

    language: 'Select Language',
    primary_genre: 'Select Primary Genre',
    secondary_genre: 'Select Secondary Genre',

    releaseDate: "",
    listenerTimeZone: true,
    generalTimeZone: true,
    release_time: "",

    releaseTimeHours: "12",
    releaseTimeMinutes: "00",
    releaseTimeFormat: "AM",

    soldWorldwide: "",
    label_name: "",
    recording_location: "",
    upc_ean: "",
};

const singleRelease2 = {
    email: '',
    release_type: '',
    store: '',
    social_platform: "",

    mp3_file: <any> '',
    song_writer:<string[]> [],

    songArtistsCreativeRole:<creativeType[]> [],

    copyright_ownership: '',
    copyright_ownership_permissions: '',

    isrc_number: '',
    language_lyrics: '',
    lyrics: '',
    tikTokClipStartTime: '',
    cover_photo: <any> ''
}

const albumReleaseDetails = {
    _id: '',
    email: '',
    release_type: '',
    album_title: '',
    artist_name: '',

    appleMusicUrl: '',
    spotifyMusicUrl: '',
    
    selectedArtistName: <any> {},
    // explicitLyrics: '',
    language: 'Select Language',
    primary_genre: 'Select Primary Genre',
    secondary_genre: 'Select Secondary Genre',
    releaseDate: '',
    release_time: '',

    releaseTimeHours: "12",
    releaseTimeMinutes: "00",
    releaseTimeFormat: "AM",

    listenerTimeZone: true,
    generalTimeZone: true
}

const albumReleaseAdvanceFeatures = {
    email: '',
    release_type: '',
    label_name: '',
    recording_location: '',
    soldWorldwide: '',
    upc_ean: '',
}

const albumReleaseStores = {
    email: '',
    release_type: '',
    stores: '',
    socialPlatforms: '',
}


const completeAlbumData = {
    email: "latham01@yopmail.com",
    album_title: "New Dawn",
    artist_name: "John Doe",
    language: "English",
    primary_genre: "Rock",
    secondary_genre: "Alternative",
    release_date: "2024-07-15",
    release_time: "14:00",
    listenerTimeZone: "CST +3",
    otherTimeZone: "GMT +1",
    label_name: '',
    soldWorldwide: '',
    recording_location: '',
    upc_ean: '',
    store: <any> '',
    social_platform: <any> '',
    song_mp3: <any> '',
    song_title: '',
    song_writer: <any> '',
    song_artists: <any> '',
    creattive_name: <any> '',
    roles: <any> '',
    copyright_ownership: '',
    copyright_ownership_permissions: '',
    isrc_number: '',
    language_of_lyrics: '',
    language_of_lyrics_optional: '',
    ticktokClipStartTime: '',
    song_url: '',
    song_cover_url: '',
    _id: "668ae15ba93d3ea6345ba9e4",
    created_at: "2024-07-07T18:41:31.326Z",
    // "__v": 0
}

const albumReleaseSongUpload = {
    _id: '',
    email: '',
    mp3_file: <any> '',
    songAudioPreview: <any> '',
    song_title: '',
    song_writer: <string[]> [],
    songArtistsCreativeRole: <creativeType[]> [],
    explicitLyrics: '',
    copyright_ownership: '',
    copyright_ownership_permissions: '',
    isrc_number: '',
    language_lyrics: '',
    lyrics: '',
    tikTokClipStartTime: '',
}

const albumReleaseAlbumArt = {
    image: <any> '',
    imagePreview: <any> '',
}

type _typeInterface_ = {
    singleRelease1: typeof singleRelease1;
    singleRelease2: typeof singleRelease2;

    completeAlbumData: typeof completeAlbumData;

    albumReleaseDetails: typeof albumReleaseDetails;
    albumReleaseAdvanceFeatures: typeof albumReleaseAdvanceFeatures;
    albumReleaseStores: typeof albumReleaseStores;
    albumReleaseSongUpload: typeof albumReleaseSongUpload[];
    albumReleaseAlbumArt: typeof albumReleaseAlbumArt;

    _setCompleteAlbumData: (details: typeof completeAlbumData) => void;
    
    _setAlbumReleaseDetails : (details: typeof albumReleaseDetails) => void;
    _setAlbumReleaseAdvanceFeatures: (details: typeof albumReleaseAdvanceFeatures) => void;
    _setAlbumReleaseStores: (details: typeof albumReleaseStores) => void;
    _setAlbumReleaseSongUpload: (details: typeof albumReleaseSongUpload) => void;
    _removeAlbumReleaseSongUpload: (index: number) => void;
    _setAlbumReleaseAlbumArt: (details: typeof albumReleaseAlbumArt) => void;

    _setSingleRelease1: (release: typeof singleRelease1) => void;
    _setSingleRelease2: (release: typeof singleRelease2) => void;

    _clearAlbumRelease: () => void;
    _clearSingleRelease: () => void;
    _restoreAllRelease: () => void;

    // _setCreateAlbum_details: (release: typeof singleRelease2) => void;

    // updatePlayerAsync: () => Promise<void>;
};
  


export const createReleaseStore = create<_typeInterface_>((set) => ({
    singleRelease1: singleRelease1,
    singleRelease2: singleRelease2,

    completeAlbumData,

    albumReleaseDetails,
    albumReleaseAdvanceFeatures,
    albumReleaseStores,
    albumReleaseSongUpload: [],
    albumReleaseAlbumArt,
  
    _setSingleRelease1: (release) => {
        // setLocalStorage("user", user);
        setLocalStorage("singleRelease1", release);

        set((_state) => {
            return {
                singleRelease1: release,
            };
        });
    },
  
    _setSingleRelease2: (release) => {
        // setLocalStorage("user", user);
        const releaData = { ...release, mp3_file: '', songAudioPreview: '', cover_photo: '', imagePreview: '' };
        setLocalStorage("singleRelease2", releaData);

        set((_state) => {
            return {
                singleRelease2: release,
            };
        });
    },
  
    _setCompleteAlbumData: (data) => {
        // setLocalStorage("user", user);
        setLocalStorage("completeAlbumData", data);

        set((_state) => {
            return {
                completeAlbumData: data,
            };
        });
    },
  
    // _setCreateAlbum_details: (release) => {
    //     // setLocalStorage("user", user);

    //     set((_state) => {
    //         return {
    //             singleRelease2: release,
    //         };
    //     });
    // },
  
    _setAlbumReleaseDetails: (details) => {
        setLocalStorage("albumReleaseDetails", details);

        set((_state) => {
            return {
                albumReleaseDetails: details,
            };
        });
    },
  
    _setAlbumReleaseAdvanceFeatures: (details) => {
        setLocalStorage("albumReleaseAdvanceFeatures", details);

        set((_state) => {
            return {
                albumReleaseAdvanceFeatures: details,
            };
        });
    },
  
    _setAlbumReleaseStores: (details) => {
        setLocalStorage("albumReleaseStores", details);

        set((_state) => {
            return {
                albumReleaseStores: details,
            };
        });
    },
  
    _setAlbumReleaseSongUpload: (details) => {
        const albumReleaseSongUpload = getLocalStorage('albumReleaseSongUpload');
        const newDetail = { ...details, mp3_file: '', songAudioPreview: '' };
        if (albumReleaseSongUpload && albumReleaseSongUpload.length) {
            setLocalStorage("albumReleaseSongUpload", [ ...albumReleaseSongUpload, newDetail ]);
        } else {
            setLocalStorage("albumReleaseSongUpload", [ newDetail ]);
        }

        set((state) => {
            const songUpload = [ ...state.albumReleaseSongUpload, details ];
            // setLocalStorage("albumReleaseSongUpload", songUpload);

            return {
                albumReleaseSongUpload: songUpload,
            };
        });
    },
  
    _removeAlbumReleaseSongUpload: (index) => {
        const albumReleaseSongUpload = getLocalStorage('albumReleaseSongUpload');
        if (albumReleaseSongUpload && albumReleaseSongUpload.length) {
            const result = albumReleaseSongUpload.filter((_: any, i: number) => i !== index);
            setLocalStorage("albumReleaseSongUpload", result);
        }
        
        
        set((state) => {
            // const remainingFruits = state.albumReleaseSongUpload.filter((_, i) => i !== index).concat([]);
            const result = state.albumReleaseSongUpload.filter((_, i) => i !== index);
            // setLocalStorage("albumReleaseSongUpload", result);

            return {
                albumReleaseSongUpload: result,
            };
        });
    },

    _setAlbumReleaseAlbumArt: (details) => {
        // setLocalStorage("albumReleaseAlbumArt", { ...details, image: '' });

        set((_state) => {
            return {
                albumReleaseAlbumArt: details,
            };
        });
    },

    _clearAlbumRelease: () => {
        removeLocalStorageItem("completeAlbumData");
        removeLocalStorageItem("albumReleaseDetails");
        removeLocalStorageItem("albumReleaseAdvanceFeatures");
        removeLocalStorageItem("albumReleaseStores");
        removeLocalStorageItem("albumReleaseSongUpload");

        set((_state) => {
            return {
                albumReleaseDetails: albumReleaseDetails,
                albumReleaseAdvanceFeatures: albumReleaseAdvanceFeatures,
                albumReleaseStores: albumReleaseStores,
                albumReleaseSongUpload: [],
                albumReleaseAlbumArt: albumReleaseAlbumArt,
            };
        });
    },

    _clearSingleRelease: () => {
        removeLocalStorageItem("singleRelease1");
        removeLocalStorageItem("singleRelease2");

        set((_state) => {
            return {
                singleRelease1: singleRelease1,
                singleRelease2: singleRelease2,
            };
        });
    },

    _restoreAllRelease: () => {
        const singleRelease1_LS = getLocalStorage("singleRelease1");
        const singleRelease2_LS = getLocalStorage("singleRelease2");

        const completeAlbumData_LS = getLocalStorage("completeAlbumData");

        const albumReleaseDetails_LS = getLocalStorage("albumReleaseDetails");
        const albumReleaseAdvanceFeatures_LS = getLocalStorage("albumReleaseAdvanceFeatures");
        const albumReleaseStores_LS = getLocalStorage("albumReleaseStores");
        const albumReleaseSongUpload_LS = getLocalStorage("albumReleaseSongUpload");
        const albumReleaseAlbumArt_LS = getLocalStorage("albumReleaseAlbumArt");


        set((_state) => {
            return {
                singleRelease1: singleRelease1_LS ? singleRelease1_LS : singleRelease1,
                singleRelease2: singleRelease2_LS ? singleRelease2_LS : singleRelease2,

                completeAlbumData: completeAlbumData_LS ? completeAlbumData_LS : completeAlbumData,

                albumReleaseDetails: albumReleaseDetails_LS ? albumReleaseDetails_LS : albumReleaseDetails,
                albumReleaseAdvanceFeatures: albumReleaseAdvanceFeatures_LS ? albumReleaseAdvanceFeatures_LS : albumReleaseAdvanceFeatures,
                albumReleaseStores: albumReleaseStores_LS ? albumReleaseStores_LS : albumReleaseStores,
                albumReleaseSongUpload: albumReleaseSongUpload_LS ? albumReleaseSongUpload_LS : [],
                albumReleaseAlbumArt: albumReleaseAlbumArt_LS ? albumReleaseAlbumArt_LS : albumReleaseAlbumArt,
            };
        });
    }


}));
  