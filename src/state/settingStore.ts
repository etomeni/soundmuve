import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../util/storage";
import { SnackbarToastInterface } from "../components/ToastNotification";


const defaulToastNotification: SnackbarToastInterface = {
    status: "info",
    display: false,
    message: '',
}

const defaultLanguage = {
    languageCode: "en", displayName: "English" 
};


type _typeInterface_ = {
    darkTheme: boolean;
    toastNotification: SnackbarToastInterface;
    language: typeof defaultLanguage;

    _setTranslationLanguage: (language: typeof defaultLanguage) => void;
    _setTheme: (theme: boolean) => void;
    _setToastNotification: (toast: SnackbarToastInterface) => void;

    _restoreSettings: () => void;

    // updatePlayerAsync: () => Promise<void>;
};

export const useSettingStore = create<_typeInterface_>((set) => ({
    darkTheme: true,
    // appLoading: defaultLoading,
    // settings: defaultSettings,
    toastNotification: defaulToastNotification,
    language: defaultLanguage,

    _setTranslationLanguage: (language) => {
        setLocalStorage("language", language);

        set((_state) => {
            return { language: language };
        });
    },

    _setToastNotification: (toast) => {
        set((_state) => {
            return { toastNotification: toast };
        });
    },

    _setTheme: (theme) => {
        setLocalStorage("settings", {darkTheme: theme});
        set((_state) => {
            return { darkTheme: theme };
        });
    },

    _restoreSettings: () => {
        const settings = getLocalStorage("settings");
        const language = getLocalStorage("language");
        
        set((state) => {
            return { 
                darkTheme: settings?.darkTheme || state.darkTheme,
                language: language || state.language,
            };
        });
    },
  
}));
