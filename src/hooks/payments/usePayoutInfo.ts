import { useCallback, useState } from "react";
import { payoutDetailsInterface, savePayoutDetailsInterface } from "@/typeInterfaces/payout.interface";
import { supportCurrencies } from "@/util/currencies";
import { allNgBanks } from "@/util/banks";
import { withdrawExchangeInterface } from "@/typeInterfaces/transaction.interface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


// function getLocalPayoutData() {
//     const localPayoutDetails = getLocalStorage("payoutDetails");
//     if (localPayoutDetails && localPayoutDetails.length) {
//         return localPayoutDetails;
//     } else {
//         return []
//     }
// }

export function usePayoutData() {
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const [paymentDetails, setPaymentDetails] = useState<payoutDetailsInterface[]>([]);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState('');

    const [currencies, setCurrencies] = useState(supportCurrencies);
    const [ngBanks, setNgBanks] = useState(allNgBanks);

    const [exchangeData, setExchangeData] = useState<withdrawExchangeInterface>();
    

    const getPayoutInfo = useCallback(async () => {
        try {
            const response = (await apiClient.get(`/payout-details`)).data;
            
            if (response.status) {
                setPaymentDetails(response.result);

                if (response.result.length == 1) {
                    setSelectedPaymentDetails(response.result[0]._id);
                }
            }
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);
            console.log(messageRes);
        }
    }, []);

    const saveBankPayoutDetails = useCallback(async (data2submit: savePayoutDetailsInterface) => {
        try {
            const response = (await apiClient.post(`/payout-details/setup`, data2submit)).data;
            // console.log(response);

            if (response.status) {
                // setApiResponse({
                //     display: true,
                //     status: true,
                //     message: response.message
                // });

                return true;
            }
            return false;
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            return false;
        }
        
    }, []);

    const getSupportedCurrencies = useCallback( async () => {
        try {
            const response = (await apiClient.get(`/payout-details/get-currencies`)).data;
            // console.log(response);

            if (response.status) {
                // const supportedCurrency = getSupportedCurrency(response);
                setCurrencies(response.result);
            }

        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }, []);


    const getAllSupportedNgBanks = useCallback( async () => {
        try {
            const response = (await apiClient.get(`/payout-details/banks/NG`)).data;
            // console.log(response);

            if (response.status) {
                const banks: typeof ngBanks = response.result

                // remove all duplicates from the list of banks
                const uniqueBanks = banks.filter((bank, index, self) => 
                    index === self.findIndex(b => b.code === bank.code)
                    // index === self.findIndex(b => b.id === bank.id || b.code === bank.code)
                );
                
                // sort the list of banks by alphabetical order
                const sortedBanks = uniqueBanks.sort((a: any, b: any) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });

                setNgBanks(sortedBanks);
            }
            
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", false);
            
            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            // });
        }
    }, []);

    const getBankAccountName = useCallback( async (account_number: string, account_bank: string) => {
        try {
            const response = (await apiClient.post(`/payout-details/resolve-account-name`,
                { account_number, account_bank },
            )).data;
            console.log(response);

            if (response.status) {

            }
            
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", false);
        }
    }, []);

    const getExchangeRate = useCallback(async (amount: string, currency: string) => {
        try {
            const response = (await apiClient.get(`/transactions/exchange-rate`, {
                params: {
                    amount: amount,
                    currency: currency
                }
            })).data;
            // console.log(response);

            setExchangeData(response.result);

            // if (response.length == 1) {
            //     setSelectedPaymentDetails(response[0]._id);
            // }

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", false);
        }
    }, []);





    return {
        apiResponse, setApiResponse,

        currencies, getSupportedCurrencies,

        ngBanks, getAllSupportedNgBanks,
        getBankAccountName,

        paymentDetails,
        selectedPaymentDetails,
        setSelectedPaymentDetails,

        getPayoutInfo,
        saveBankPayoutDetails,

        exchangeData,
        setExchangeData,
        getExchangeRate,
    }
}



