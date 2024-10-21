import { create } from "zustand";
import { 
    add2cartResponseInterface, cartItemInterface,
} from "@/constants/cartInterface";


const add2cartResponse: add2cartResponseInterface = {
    email: "",
    items: [],
    total: 0,
    _id: "",
    createdAt: ""
};

type _typeInterface_ = {
    add2cartResponse: add2cartResponseInterface;
    cart: cartItemInterface[];
    
    _clearCartItems: () => void;

    // updatePlayerAsync: () => Promise<void>;

    _addToCart: (newCartItem: cartItemInterface) => void;
    _removeFromCart: (cartItem: cartItemInterface) => void;
    _editCart: (cartItem: cartItemInterface) => void;
    _overRideCart: (cartItem: cartItemInterface[]) => void;

    _setAdd2cartResponse: (data: add2cartResponseInterface) => void;
};
  
export const useCartItemStore = create<_typeInterface_>((set) => ({
    cart: [
        // {
        //     artistName: "john",
        //     artWorkImg: "",
        //     email: "sundaywht@gmail.com",
        //     id: "1234567cfghj",
        //     price: 25,
        //     releaseType: "Single",
        //     songTitle: "God is Good"
        // }
    ],
    add2cartResponse: add2cartResponse,

    _addToCart: (newCartItem) => {
        set((state) => {
            const remove_result = state.cart.filter(
                (item) => item.release_id !== newCartItem.release_id
            );
            const result = [...remove_result, newCartItem];

            // setLocalStorage("cart", result);

            return {
                cart: result,
                // cart: [newCartItem],
            };
        });
    },

    _removeFromCart: (cartItem) => {
        set((state) => {
            const result = state.cart.filter((item) => item.release_id !== cartItem.release_id);
            // setLocalStorage("cart", result);

            return {
                cart: result,
            };
        });
    },

    _editCart: (cartItem) => {
        set((state) => {
            const result = state.cart.map((obj) => {
                if (obj.release_id === cartItem.release_id) {
                return cartItem;
                }
                // If the ID doesn't match, return the original object
                return obj;
            });
            // setLocalStorage("cart", result);

            return {
                cart: result,
            };
        });
    },

    _overRideCart: (cartItem) => {
        set((_state) => {
            return {
                cart: cartItem,
            };
        });
    },

    _clearCartItems: () => {
        set((_state) => {
            // removeLocalStorageItem("cart");

            return {
                cart: [],
            };
        });
    },


    _setAdd2cartResponse: (data) => {
        set((_state) => {
            return {
                add2cartResponse: data,
            };
        });
    },
    
}));
  