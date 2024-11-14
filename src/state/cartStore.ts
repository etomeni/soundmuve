import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore";
import { apiEndpoint } from "@/util/resources";
import { getLocalStorage, removeLocalStorageItem, setLocalStorage } from "@/util/storage";
import { cartItemInterface, couponInterface } from "@/typeInterfaces/cartInterface";


const defaultPaymentIntent = {
    clientSecret: '',
    secretKey: '',
    publishableKey: ''
};

const defaultCouponDiscount: couponInterface = {
    _id: "",
    cartItems: [],
    user_id: "",
    user_name: "",
    user_email: "",
    youtubeLink: "",
    instagramFacebookLink: "",
    xLink: "",
    status: "Pending"
};


type _typeInterface_ = {
    cart: cartItemInterface[];
    couponDiscount: couponInterface;
    paymentIntent: typeof defaultPaymentIntent;
    
    // _clearCartItems: () => void;

    _addToCart: (newCartItem: cartItemInterface) => void;
    _handleSetCartItems: (newCartItem: cartItemInterface[]) => void;
    // _removeFromCart: (cartItem: cartItemInterface) => void;
    // _editCart: (cartItem: cartItemInterface) => void;
    // _overRideCart: (cartItem: cartItemInterface[]) => void;

    _restoreCartItems: () => void;
    _clearCartItems: () => void;
    _setPaymentKeys: (data: typeof defaultPaymentIntent) => void;

    _setCouponDiscount: (data: couponInterface) => void;
    _clearCouponDiscount: () => void;
    // updatePlayerAsync: () => Promise<void>;
};
  
export const useCartItemStore = create<_typeInterface_>((set) => ({
    cart: [],
    paymentIntent: defaultPaymentIntent,
    couponDiscount: defaultCouponDiscount,

    _addToCart: (newCartItem) => {
        set((state) => {
            const remove_result = state.cart.filter(
                (item) => item.release_id !== newCartItem.release_id
            );
            const result = [...remove_result, newCartItem];

            setLocalStorage("cart", result);

            return {
                cart: result,
                // cart: [newCartItem],
            };
        });
    },

    // _removeFromCart: (cartItem) => {
    //     set((state) => {
    //         const result = state.cart.filter((item) => item.release_id !== cartItem.release_id);
    //         // setLocalStorage("cart", result);

    //         return {
    //             cart: result,
    //         };
    //     });
    // },

    // _editCart: (cartItem) => {
    //     set((state) => {
    //         const result = state.cart.map((obj) => {
    //             if (obj.release_id === cartItem.release_id) {
    //             return cartItem;
    //             }
    //             // If the ID doesn't match, return the original object
    //             return obj;
    //         });
    //         // setLocalStorage("cart", result);

    //         return {
    //             cart: result,
    //         };
    //     });
    // },

    _handleSetCartItems: (cartItem) => {
        setLocalStorage("cart", cartItem);

        set((_state) => {
            return {
                cart: cartItem,
            };
        });
    },

    _clearCartItems: () => {
        set((_state) => {
            removeLocalStorageItem("cart");
            return {
                cart: [],
                paymentIntent: defaultPaymentIntent
            };
        });
    },


    // _setAdd2cartResponse: (data) => {
    //     set((_state) => {
    //         return {
    //             add2cartResponse: data,
    //         };
    //     });
    // },

    _restoreCartItems: async () => {
        const cartItems = getLocalStorage("cart");
        const accessToken = useUserStore.getState().accessToken;

        try {
            set((_state) => {
                return {
                    cart: cartItems && cartItems.length ? cartItems : [],
                };
            });

            const response = (await axios.get(`${apiEndpoint}/checkout/get-cart-items`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;

            if (response.status) {
                setLocalStorage("cart", response.result);

                set((_state) => {
                    return {
                        cart: response.result,
                    };
                });
                return
            };
            
        } catch (error: any) {
            console.log(error);            

            set((_state) => {
                return {
                    cart: cartItems && cartItems.length ? cartItems : [],
                };
            });
        }

    },

    _setPaymentKeys: async (data) => {
        set((_state) => {
            return {
                paymentIntent: data,
            };
        });
    },



    _setCouponDiscount: async (data) => {
        set((_state) => {
            return {
                couponDiscount: data,
            };
        });
    },

    _clearCouponDiscount: () => {
        set((_state) => {
            return {
                couponDiscount: defaultCouponDiscount
            };
        });
    },

    
}));
  