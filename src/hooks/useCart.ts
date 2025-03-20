import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';

import { useCartItemStore } from "@/state/cartStore";
import { getQueryParams, getCartTotalAmount } from "@/util/resources";
// import { useUserStore } from "@/state/userStore";
import { cartItemInterface } from "@/typeInterfaces/cartInterface";
import { getLocalStorage } from "@/util/storage";
import { useSettingStore } from "@/state/settingStore";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


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
    // const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    useEffect(() => {
        const totalCartAmount = getCartTotalAmount(cartItems);
        setTotalAmount(totalCartAmount);
    }, [cartItems]);


    const handleAddToCart = useCallback(async(item: cartItemInterface) => {
        try {
            const response = (await apiClient.post(`/checkout/add-to-cart`, item)).data;
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
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong");
            
            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }, []);

    const handleRemoveCartItem = useCallback(async (item: cartItemInterface) => {
        try {
            const response = (await apiClient.delete(`/checkout/${item._id}`)).data;
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
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong");
            console.log(messageRes);
            
        }
    }, []);

    const getCartItems = useCallback(async () => {
        const cartItems = getLocalStorage("cart");
        if (cartItems && cartItems.length) {
            _handleSetCartItems(cartItems);
        }

        try {
            const response = (await apiClient.get(`/checkout/get-cart-items`)).data;
            // console.log(response);

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
            // const err = error.response && error.response.data ? error.response.data : error;
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
            const response = (await apiClient.post(`/checkout/create-payment-intent`, { amount } )).data;
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
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong");

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }, []);


    const handleApplyPromo = useCallback(async(promoCode: string, cartItems: cartItemInterface[]) => {
        const data2db = {
            cartItems,
            promoCode: promoCode,
        };

        try {
            const response = (await apiClient.post(`/checkout/apply-promo-code`, data2db )).data;
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
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong");
            // console.log(error);
            const err = error.response && error.response.data ? error.response.data : error;
    
            _setToastNotification({
                display: true,
                status: "error",
                message: messageRes
            });

            return {
                status: false,
                result: { ...err, message: messageRes }
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
            const response = (await apiClient.post(`/checkout/successful-payment`,
                data2submit
            )).data;
            // console.log(response);

            if (response.status) {
                // setApplyPromoResponse(response);
                _clearCartItems();
                _clearCouponDiscount();
            }
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong");
            console.log(messageRes);
        }
    }
        
    const handleFlutterwaveSuccessfulPayment = async (flutterWaveResponse: FlutterWaveResponse) => {
        const data2submit = {
            cartItems: cartItems,
            paidAmount: flutterWaveResponse.amount,
            paymentIntent: flutterWaveResponse.transaction_id,
            paymentIntentClientSecret: flutterWaveResponse.tx_ref,
            paymentStatus: flutterWaveResponse.status,
            flutterWaveResponse
        };

        try {
            const response = (await apiClient.post(`/checkout/successful-payment`,
                data2submit
            )).data;
            // console.log(response);

            if (response.status) {
                // setApplyPromoResponse(response);
                _clearCartItems();
                _clearCouponDiscount();
            }
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong");
            console.log(messageRes);
        }
    }

    const handleCheckReleaseCart = useCallback(async(item: cartItemInterface) => {
        try {
            const response = (await apiClient.post(`/checkout/check-release-cart`, item )).data;
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
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong");
            console.log(messageRes);
            
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
        handleFlutterwaveSuccessfulPayment,

        handleCheckReleaseCart
    }
}
