import { albumRelease1Interface, albumRelease2Interface, albumRelease3Interface, releaseInterface, singleRelease1Interface, singleRelease2Interface, songInterface } from "@/typeInterfaces/release.interface";
import { getLocalStorage, removeLocalStorageItem, setLocalStorage } from "@/util/storage";
import { create } from "zustand";


const defaultReleaseData: releaseInterface = {
    user_id: "",
    email: "",
    releaseType: "single",
    title: "",
    mainArtist: {
        spotifyProfile: {
            name: "",
            id: "",
            profilePicture: "",
            latestAlbum: undefined
        },
        appleMusicProfile: undefined
    },
    language: "",
    primaryGenre: "",
    secondaryGenre: "",
    releaseDate: "",
    spotifyReleaseTime: {
        hours: "",
        minutes: "",
        am_pm: "AM"
    },
    spotifyReleaseTimezone: "",
    labelName: "",
    recordingLocation: "",
    soldCountries: {
        worldwide: "Yes",
        countries: []
    },
    upc_ean: "",
    stores: [],
    socialPlatforms: [],
    coverArt: "",
    status: "Incomplete"
};


type _typeInterface_ = {
    singleRelease: releaseInterface;
    albumRelease: releaseInterface;
    
    _handleSetSingleRelease1: (details: singleRelease1Interface | releaseInterface) => void;
    _handleSetSingleRelease2: (details: singleRelease2Interface | releaseInterface) => void;
    _handleClearSingleRelease: () => void;
    
    _handleSetAlbumRelease1: (details: albumRelease1Interface | releaseInterface) => void;
    _handleSetAlbumRelease2: (details: albumRelease2Interface | releaseInterface) => void;
    _handleSetAlbumRelease3: (details: albumRelease3Interface | releaseInterface) => void;
    _handleSetAlbumRelease4: (details: songInterface | releaseInterface) => void;
    _handleSetAlbumRelease: (details: releaseInterface) => void;

    _removeAlbumReleaseSongUpload: (index: number) => void;

    _handleClearAlbumRelease: () => void;

    _restoreAllRelease: () => void;

    // updatePlayerAsync: () => Promise<void>;
};
  


export const useCreateReleaseStore = create<_typeInterface_>((set) => ({
    singleRelease: defaultReleaseData,
    albumRelease: defaultReleaseData,


    // albumReleaseSongUpload: [],
  
    _handleSetSingleRelease1: (release: singleRelease1Interface | releaseInterface) => {
        // setLocalStorage("user", user);
        
        set((state) => {
            const updateRelease: any = { ...state.singleRelease, ...release };
            setLocalStorage("singleRelease", updateRelease);

            return {
                singleRelease: updateRelease,
            };
        });
    },
  
    _handleSetSingleRelease2: (release: singleRelease2Interface | releaseInterface) => {
        set((state) => {
            const updateRelease: any = { ...state.singleRelease, ...release };
            setLocalStorage("singleRelease", updateRelease);

            return {
                singleRelease: updateRelease,
            };
        });
    },

    _handleClearSingleRelease: () => {
        removeLocalStorageItem("singleRelease");

        set((_state) => {
            return {
                singleRelease: defaultReleaseData,
            };
        });
    },



    _handleSetAlbumRelease1: (release: albumRelease1Interface | releaseInterface) => {
        // setLocalStorage("user", user);
        
        set((state) => {
            const updateRelease: any = { ...state.albumRelease, ...release };
            setLocalStorage("albumRelease", updateRelease);

            return {
                albumRelease: updateRelease,
            };
        });
    },

    _handleSetAlbumRelease2: (release: albumRelease2Interface | releaseInterface) => {
        // setLocalStorage("user", user);
        
        set((state) => {
            const updateRelease: any = { ...state.albumRelease, ...release };
            setLocalStorage("albumRelease", updateRelease);

            return {
                albumRelease: updateRelease,
            };
        });
    },
  
    _handleSetAlbumRelease3: (release: albumRelease3Interface | releaseInterface) => {
        // setLocalStorage("user", user);
        
        set((state) => {
            const updateRelease: any = { ...state.albumRelease, ...release };
            setLocalStorage("albumRelease", updateRelease);

            return {
                albumRelease: updateRelease,
            };
        });
    },
  
    _handleSetAlbumRelease4: (release: songInterface | releaseInterface) => {
        // setLocalStorage("user", user);
        
        set((state) => {
            const updateRelease: any = { ...state.albumRelease, ...release };
            setLocalStorage("albumRelease", updateRelease);

            return {
                albumRelease: updateRelease,
            };
        });
    },
  
    _handleSetAlbumRelease: (release: releaseInterface) => {
        set((state) => {
            const updateRelease: any = { ...state.albumRelease, ...release };
            setLocalStorage("albumRelease", updateRelease);

            return {
                albumRelease: updateRelease,
            };
        });
    },

    _removeAlbumReleaseSongUpload: (index: number) => {
        
        set((state) => {
            // const remainingFruits = state.albumRelease.filter((_, i) => i !== index).concat([]);
            const result = state.albumRelease.albumSongs?.filter((_, i) => i !== index);
            // setLocalStorage("albumRelease", result);

            if (!result) {
                return {
                    albumRelease: state.albumRelease,
                };
            }

            return {
                albumRelease: { ...state.albumRelease, albumSongs: result},
            };
        });
    },

    _handleClearAlbumRelease: () => {
        removeLocalStorageItem("albumRelease");
        set((_state) => {
            return {
                albumRelease: defaultReleaseData,
            };
        });
    },
  

    _restoreAllRelease: () => {
        const singleRelease = getLocalStorage("singleRelease");
        const albumRelease = getLocalStorage("albumRelease");

        set((_state) => {
            return {
                singleRelease: singleRelease ? singleRelease : defaultReleaseData,
                albumRelease: albumRelease ? albumRelease : defaultReleaseData,
            };
        });
    }
}));
  