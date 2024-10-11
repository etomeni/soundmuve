import { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import LoadingDataComponent from '@/components/LoadingData';

function CheckoutFormPage({ amount }: { amount: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const accessToken = useUserStore((state) => state.accessToken);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [clientSecret, setClientSecret] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleGetClientSecret();
    }, [amount]);
    

    const handleGetClientSecret = async () => {
        try {
            const response = (await axios.post(`${apiEndpoint}/checkout/create-payment-intent`,
                {amount}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);

            if (response.clientSecret) {
                setClientSecret(response.clientSecret);
            }

        } catch (error: any) {
            const err = error.response.data || error;
            console.log(err);
            setApiResponse({
                display: true,
                status: false,
                message: err.message || '',
            });
        }
    }

    const handleClickedPay = async () => {
        setIsLoading(true);

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setApiResponse({
                display: true,
                status: false,
                message: submitError.message || '',
            });
            setIsLoading(false);
            return;
        }


        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements, 
            clientSecret,
            confirmParams: {
                return_url: `https://http://localhost:5173/account/success?amount=${ amount }`,
            },
        });
    
        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);

            setApiResponse({
                display: true,
                status: false,
                message: result.error.message || '',
            });
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }

        setIsLoading(false);

    }

    if (!clientSecret || !stripe || !elements) {
        return (
            <Box>
                <LoadingDataComponent />
            </Box>
        )
    }

 

    return (
        <Box>
            { clientSecret && <PaymentElement /> }

            {
                apiResponse.display && (
                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                        <Alert severity={apiResponse.status ? "success" : "error"}>
                            {apiResponse.message}
                        </Alert>
                    </Stack>
                )
            }

            <button type='button'
                onClick={() => handleClickedPay}
                disabled={!stripe || isLoading}
            >
                { !isLoading ? `Pay ${amount}` : "Processing" }
            </button>


            {/* <div onClick={() => handleClickedPay} >CheckoutFormPage</div> */}

        </Box>
    )
}

export default CheckoutFormPage