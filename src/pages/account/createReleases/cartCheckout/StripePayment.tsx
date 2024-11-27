import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { convertToSubCurrency } from '@/util/resources';
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

function getTotalAmount(cartItems: cartItemInterface[]) {
    if (cartItems.length) {
        const totalPrice = cartItems.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.price;
        }, 0);
    
        return totalPrice;
    }
    return 0;
}

const StripePayment: React.FC<_Props> = ({
    cartItems, discount, openModal, closeModal, // confirmBtn
}) => {
    const [amount, setamount] = useState(discount.payableAmount || getTotalAmount(cartItems));
    const { handleGetPaymentIntent } = useCart();


    useEffect(() => {
        if (discount._id) {
            setamount(discount.payableAmount || 0);
        } else {
            setamount(getTotalAmount(cartItems));
        }

        // setamount(getTotalAmount(cartItems));
        setTimeout(() => {
            handleGetPaymentIntent(amount);
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