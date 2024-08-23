import { create } from "zustand";
import { userInterface } from "../constants/typesInterface";
import { getLocalStorage, removeLocalStorageItem, setLocalStorage } from "../util/storage";


const userEmptyData: userInterface = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    balance: 0,
    teamType: '',
    created_at: ""
};



type _typeInterface_ = {
    accessToken: string;
    refreshToken: string;
    userData: userInterface;
    isLoggedIn: boolean;
    _loginUser: (user: userInterface, token: string, refreshToken: string) => void;
    _autoLogin: (user: userInterface) => void;
    _logOutUser: () => void;
    _handleRestoreUser: () => void;
    // _handleRefresh: (user?: userInterface, token?: string) => void;
    _signUpUser: (user: userInterface) => void;
    _verifyUser: (user: userInterface) => void;
    _updateUser: (user: userInterface) => void;
    // updatePlayerAsync: () => Promise<void>;
};
  


export const useUserStore = create<_typeInterface_>((set) => ({
    accessToken: "",
    refreshToken: "",
    userData: userEmptyData,
    isLoggedIn: false,
    _loginUser: (user, token, refreshToken) => {
        setLocalStorage("refreshToken", refreshToken);
        setLocalStorage("access_token", token);
        setLocalStorage("user", user);
    
        set((_state) => {
            return {
                userData: user,
                accessToken: token,
                refreshToken: refreshToken,
                isLoggedIn: true,
            };
        });
    },
    _autoLogin: (user) => {
        setLocalStorage("user", user);
    
        set((_state) => {
            return {
                userData: user,
                isLoggedIn: true,
            };
        });
    },
    _updateUser: (user) => {
        set((state) => {
            const newUserData = { ...state.userData, ...user };
            setLocalStorage("user", newUserData);
    
            return {
                userData: newUserData,
            };
        });
    },
    _logOutUser: () => {
        removeLocalStorageItem("user");
        removeLocalStorageItem("access_token");
        removeLocalStorageItem("refreshToken");
    
        set((_state) => {
            return {
                userData: userEmptyData,
                isLoggedIn: false,
                accessToken: "",
                refreshToken: "",
            };
        });
    },
  
    _handleRestoreUser: () => {
        const user = getLocalStorage("user");
        const accessToken = getLocalStorage("access_token");
        const refreshToken = getLocalStorage("refreshToken");
        
        set((state) => {
            return {
                userData: user || state.userData,
                accessToken: accessToken || state.accessToken,
                refreshToken: refreshToken || state.refreshToken
            }
        });
    },
  
    _signUpUser: (user) => {
        setLocalStorage("user", user);

        set((_state) => {
            return {
                userData: user,
            };
        });
    },
    _verifyUser: () => {},
}));
  