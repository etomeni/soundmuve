// import React from 'react';
import { convertToSubCurrency } from '@/util/resources';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutFormPage from './CheckoutFormPage';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');


function StripePayment() {
    const amount = 45.0;
      
    return (
        <Box>
            <Typography>Amount</Typography>
            <Typography>{amount}</Typography>

            <div>StripePayment</div>

            <Elements stripe={stripePromise} 
                options={{
                    // passing the client secret obtained from the server
                    // clientSecret: '{{CLIENT_SECRET}}',
                    // mode: "payment",
                    mode: "payment",
                    amount: convertToSubCurrency(amount), // convert to cents
                    currency: "usd",
                }}
            >
                <CheckoutFormPage amount={amount} />
            </Elements>
        </Box>
    )
}

export default StripePayment;