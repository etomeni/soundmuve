import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { payoutDetailsInterface, savePayoutDetailsInterface } from "@/typeInterfaces/payout.interface";
import { supportCurrencies } from "@/util/currencies";
import { allNgBanks } from "@/util/banks";


// function getLocalPayoutData() {
//     const localPayoutDetails = getLocalStorage("payoutDetails");
//     if (localPayoutDetails && localPayoutDetails.length) {
//         return localPayoutDetails;
//     } else {
//         return []
//     }
// }

export function usePayoutData() {
    const accessToken = useUserStore((state) => state.accessToken);
    const [paymentDetails, setPaymentDetails] = useState<payoutDetailsInterface[]>([]);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState('');

    const [currencies, setCurrencies] = useState(supportCurrencies);
    const [ngBanks, setNgBanks] = useState(allNgBanks);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });



    const getPayoutInfo = useCallback(async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/payout-details`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            
            if (response.status) {
                setPaymentDetails(response.result);

                if (response.result.length == 1) {
                    setSelectedPaymentDetails(response.result[0]._id);
                }
            }
        } catch (error: any) {
            console.log(error);
            
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
            // setPaymentDetails([]);
        }
    }, []);

    const saveBankPayoutDetails = useCallback(async (data2submit: savePayoutDetailsInterface) => {
        try {
            const response = (await axios.post(`${apiEndpoint}/payout-details/setup`, 
                data2submit, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
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
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            return false;
        }
        
    }, []);

    const getSupportedCurrencies = useCallback( async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/payout-details/get-currencies`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // const supportedCurrency = getSupportedCurrency(response);
                setCurrencies(response.result);
            }

        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);


    const getAllSupportedNgBanks = useCallback( async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/payout-details/banks/NG`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
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
            const err = error.response.data || error;
            // const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            // });
        }
    }, []);

    const getBankAccountName = useCallback( async (account_number: string, account_bank: string) => {
        try {
            const response = (await axios.post(`${apiEndpoint}/payout-details/resolve-account-name`,
                { account_number, account_bank },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);

            if (response.status) {

            }
            
        } catch (error: any) {
            const err = error.response.data || error;
            // const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            // });
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
    }
}



