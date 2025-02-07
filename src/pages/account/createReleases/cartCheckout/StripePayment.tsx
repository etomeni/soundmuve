import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { convertToSubCurrency, getCartTotalAmount } from '@/util/resources';
import CheckoutFormPage from './CheckoutFormPage';
import ModalWrapper from '@/components/account/ModalWrapper';
import { cartItemInterface, couponInterface } from '@/typeInterfaces/cartInterface';
import { useCart } from '@/hooks/useCart';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


interface _Props {
    cartItems: cartItemInterface[],
    discount: couponInterface,
    openModal: boolean,
    closeModal: () => void;
    // confirmBtn: (data: any) => void;
}

const StripePayment: React.FC<_Props> = ({
    cartItems, discount, openModal, closeModal, // confirmBtn
}) => {
    const [amount, setamount] = useState(discount.payableAmount || getCartTotalAmount(cartItems));
    const { handleGetPaymentIntent } = useCart();


    useEffect(() => {
        const gatPayAmount = discount._id && discount.payableAmount ? discount.payableAmount : getCartTotalAmount(cartItems);
        setamount(gatPayAmount);

        setTimeout(() => {
            handleGetPaymentIntent(gatPayAmount);
        }, 500);
    }, [cartItems, discount]);

      
    return (
        <ModalWrapper
            closeModal={closeModal}
            openModal={openModal}
        >
            <Box>
                <Elements stripe={stripePromise} 
                    options={{
                        // passing the client secret obtained from the server
                        // clientSecret: paymentIntent.clientSecret, // '{{CLIENT_SECRET}}',
                        
                        mode: "payment",
                        amount: convertToSubCurrency(amount), // convert to cents
                        currency: "usd",
                    }}
                >
                    <CheckoutFormPage amount={amount} />
                </Elements>
            </Box>
        </ModalWrapper>
    )
}

export default StripePayment;