import { cartItemInterface } from "@/constants/typesInterface";
// import { removeLocalStorageItem, setLocalStorage } from "@/util/storage";
import { create } from "zustand";


type _typeInterface_ = {
    cart: cartItemInterface[];
    
    _clearCartItems: () => void;

    // updatePlayerAsync: () => Promise<void>;

    _addToCart: (newCartItem: cartItemInterface) => void;
    _removeFromCart: (cartItem: cartItemInterface) => void;
    _editCart: (cartItem: cartItemInterface) => void;
    _overRideCart: (cartItem: cartItemInterface[]) => void;
};
  
export const cartItemStore = create<_typeInterface_>((set) => ({
    cart: [],

    _addToCart: (newCartItem) => {
        set((state) => {
            const remove_result = state.cart.filter(
                (item) => item.id !== newCartItem.id
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
            const result = state.cart.filter((item) => item.id !== cartItem.id);
            // setLocalStorage("cart", result);

            return {
                cart: result,
            };
        });
    },

    _editCart: (cartItem) => {
        set((state) => {
            const result = state.cart.map((obj) => {
                if (obj.id === cartItem.id) {
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
    
}));
  