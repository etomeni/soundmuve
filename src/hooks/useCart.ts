import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { useCartItemStore } from "@/state/cartStore";
import { getQueryParams, apiEndpoint } from "@/util/resources";
// import { localApiEndpoint } from "@/util/resources";
import { useUserStore } from "@/state/userStore";
import { cartItemInterface } from "@/typeInterfaces/cartInterface";
import { getLocalStorage } from "@/util/storage";
import { useSettingStore } from "@/state/settingStore";


export function useCart() {
    // const navigate = useNavigate();
    const cartItems = useCartItemStore((state) => state.cart);
    const _setPaymentKeys = useCartItemStore((state) => state._setPaymentKeys);
    const _handleSetCartItems = useCartItemStore((state) => state._handleSetCartItems);
    const _clearCartItems = useCartItemStore((state) => state._clearCartItems);

    const _setCouponDiscount = useCartItemStore((state) => state._setCouponDiscount);
    const _clearCouponDiscount = useCartItemStore((state) => state._clearCouponDiscount);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    // const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    useEffect(() => {
        if (cartItems.length) {
            const totalPrice = cartItems.reduce((accumulator, currentObject) => {
                return accumulator + currentObject.price;
            }, 0);
    
            setTotalAmount(totalPrice);
        }
    }, [cartItems]);


    const handleAddToCart = useCallback(async(item: cartItemInterface) => {
        try {
            const response = (await axios.post(`${apiEndpoint}/checkout/add-to-cart`,
                item, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            // console.log(response);

            if (response.status) {
                _handleSetCartItems(response.result);
                return
            }

            setApiResponse({
                display: true,
                status: false,
                message: response.message
            });
        } catch (error: any) {
            console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, something went wrong";

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const handleRemoveCartItem = useCallback(async (item: cartItemInterface) => {
        try {
            const response = (await axios.delete(`${apiEndpoint}/checkout/${item._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            // console.log(response);

            if (response.status) {
                _handleSetCartItems(response.result);
                return
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
        } catch (error: any) {
            console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, something went wrong";

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getCartItems = useCallback(async () => {
        const cartItems = getLocalStorage("cart");
        if (cartItems && cartItems.length) {
            _handleSetCartItems(cartItems);
        }

        try {
            const response = (await axios.get(`${apiEndpoint}/checkout/get-cart-items`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);

            if (response.status) {
                _handleSetCartItems(response.result);
                // navigate("/account/checkout");
                return
            }

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: response.message
            // });
        } catch (error: any) {
            console.log(error);
            // const err = error.response.data || error;
            // const fixedErrorMsg = "Oooops, something went wrong";

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            // });
        }
    }, []);


    const handleGetPaymentIntent = useCallback(async(amount: number) => {
        try {
            const response = (await axios.post(`${apiEndpoint}/checkout/create-payment-intent`,
                { amount }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            // console.log(response);

            if (response.status) {
                _setPaymentKeys({
                    clientSecret: response.result.clientSecret,
                    secretKey: response.result.secretKey,
                    publishableKey: response.result.publishableKey,
                })

                return;
            }

            setApiResponse({
                display: true,
                status: false,
                message: response.message
            });
        } catch (error: any) {
            console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, something went wrong";

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);


    const handleApplyPromo = useCallback(async(promoCode: string, cartItems: cartItemInterface[]) => {
        const data2db = {
            cartItems,
            promoCode: promoCode,
        };

        try {
            const response = (await axios.post(`${apiEndpoint}/checkout/apply-promo-code`,
                data2db, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            // console.log(response);

            if (response.status) {
                _setCouponDiscount(response.result);
                setTotalAmount(response.result.payableAmount);

                _setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });
            }

            return {
                status: true,
                result: response
            };
        } catch (error: any) {
            // console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, something went wrong";
            console.log(err);

            const errorMessage = err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg;

            _setToastNotification({
                display: true,
                status: "error",
                message: errorMessage
            });

            return {
                status: false,
                result: { ...err, message: errorMessage }
            };
        }
    }, []);
    
        
    const handleSuccessfulPayment = async () => {
        const amount = getQueryParams('amount');
        const payment_intent = getQueryParams('payment_intent');
        const payment_intent_client_secret = getQueryParams('payment_intent_client_secret');
        const redirect_status = getQueryParams('redirect_status');

        const data2submit = {
            cartItems: cartItems,
            paidAmount: amount,
            paymentIntent: payment_intent,
            paymentIntentClientSecret: payment_intent_client_secret,
            paymentStatus: redirect_status,
        };


        try {
            const response = (await axios.post(`${apiEndpoint}/checkout/successful-payment`,
                data2submit, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);

            if (response.status) {
                // setApplyPromoResponse(response);
                _clearCartItems();
                _clearCouponDiscount();
            }
        } catch (error: any) {
            console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, something went wrong";

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }
        


    const handleCheckReleaseCart = useCallback(async(item: cartItemInterface) => {
        try {
            const response = (await axios.post(`${apiEndpoint}/checkout/check-release-cart`,
                item, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            // console.log(response);

            if (response.status) {
                _handleSetCartItems(response.result);
                return true
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            return false;
        } catch (error: any) {
            console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, something went wrong";

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            return false;
        }
    }, []);

    
 
    return {
        cartItems,
        totalAmount,
        handleRemoveCartItem,
        handleAddToCart,
        getCartItems,

        handleGetPaymentIntent,

        // applyPromoResponse,
        handleApplyPromo,

        apiResponse,
        setApiResponse,

        handleSuccessfulPayment,

        handleCheckReleaseCart
    }
}
