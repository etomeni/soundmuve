import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { getLocalStorage, setLocalStorage } from "@/util/storage";


export type paymentDetailsInterface = {
    _id: string,
    currency: string,
    account_number: string,
    beneficiary_name: string,
    email: string,
}


function getLocalPayoutData() {
    const localPayoutDetails = getLocalStorage("payoutDetails");
    if (localPayoutDetails && localPayoutDetails.length) {
        return localPayoutDetails;
    }
}

export function usePayoutData() {
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const [paymentDetails, setPaymentDetails] = useState<paymentDetailsInterface[]>(getLocalPayoutData);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState('');
    
    const getPayoutInfo = useCallback(() => {
        _getPayoutInfo()
    }, []);


    const _getPayoutInfo = async () => {
        try {
            // const response = (await axios.get(`${apiEndpoint}/payoutDetails/payouts/latham01@yopmail.com`, {
            const response = (await axios.get(`${apiEndpoint}/payoutDetails/payouts/${userData.email}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            setLocalStorage("payoutDetails", response);
            setPaymentDetails(response);

            if (response.length == 1) {
                setSelectedPaymentDetails(response[0]._id);
            }

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
            // setPaymentDetails([]);
        }
    }

    return {
        paymentDetails,
        selectedPaymentDetails,
        setSelectedPaymentDetails,

        getPayoutInfo
    }
}



