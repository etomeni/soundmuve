import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useCartItemStore } from "@/state/cartStore";
import { emekaApiEndpoint } from "@/util/resources";
import { useUserStore } from "@/state/userStore";
import { 
    applyPromoResponseInterface, cartItemInterface 
} from "@/constants/cartInterface";


export function useCart() {
    const navigate = useNavigate();
    const cartItems = useCartItemStore((state) => state.cart);
    const _removeFromCart = useCartItemStore((state) => state._removeFromCart);
    const _setAdd2cartResponse = useCartItemStore((state) => state._setAdd2cartResponse);
    const add2cartResponse = useCartItemStore((state) => state.add2cartResponse);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [applyPromoResponse, setApplyPromoResponse] = useState<applyPromoResponseInterface>();

    const handleRemoveCartItem = (item: cartItemInterface) => {
        // console.log(item);
        _removeFromCart(item);
    }

    useEffect(() => {
        const totalPrice = cartItems.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.price;
        }, 0);

        setTotalAmount(totalPrice);
    }, [cartItems]);


    const handleAddToCart = useCallback(async() => {
        const newItems = cartItems.map(item => ({
            _id: item.release_id,
            type: item.releaseType.toLowerCase(),
        }));

        const data2db = {
            email: userData.email,
            items: newItems,

            // type: cartItems[0].releaseType.toLowerCase(),
            // id: cartItems[0].id,
        };

        try {
            const response = (await axios.post(`${emekaApiEndpoint}/checkout/add-to-cart`,
                data2db, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);

            if (response.cart) {
                _setAdd2cartResponse(response.cart);
                navigate("/account/checkout");
            }

        } catch (error: any) {
            const err = error.response.data || error;
            console.log(err);
            setApiResponse({
                display: true,
                status: false,
                message: err.message || "server error"
            })
        }
    }, []);

    const handleApplyPromo = useCallback(async(promoCode: string) => {
        const data2db = {
            email: userData.email,
            code: promoCode,
            itemId: add2cartResponse.items.map(item => item._id),
            // itemId: add2cartResponse.items[0]._id || add2cartResponse._id,
        };

        try {
            const response = (await axios.post(`${emekaApiEndpoint}/checkout/apply-promo`,
                data2db, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);

            if (response.cart) {
                setApplyPromoResponse(response.cart);
            }

            return {
                status: true,
                result: response
            };
        } catch (error: any) {
            const err = error.response.data || error;
            console.log(err);

            return {
                status: false,
                result: err
            };
        }
    }, []);
    
    const handleCheckout = useCallback(async(promoCode: string) => {
        const data2db = {
            email: userData.email,
            paymentMethodId: promoCode,
        };

        try {
            const response = (await axios.post(`${emekaApiEndpoint}/checkout/checkout`,
                data2db, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);

            if (response.cart) {
                setApplyPromoResponse(response);
            }

        } catch (error: any) {
            const err = error.response.data || error;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "server error"
            })
        }
    }, []);
    
 
    return {
        cartItems,
        totalAmount,
        handleRemoveCartItem,

        handleAddToCart,

        applyPromoResponse,
        handleApplyPromo,

        apiResponse,
        setApiResponse,

        handleCheckout,
    }
}
