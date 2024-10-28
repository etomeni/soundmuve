import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { convertToSubCurrency } from '@/util/resources';
import CheckoutFormPage from './CheckoutFormPage';
import ModalWrapper from '@/components/account/ModalWrapper';
import { cartItemInterface } from '@/typeInterfaces/cartInterface';
import { useCart } from '@/hooks/useCart';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Q44BMFHz9inXqLwQhDWvdMJFrWWpiGyRxlusfoDkT9bAIBy1Chsdw7AJflhOWmxF5bp6CXyRscKUTveS1m5tOGM00uKJKZALZ');


interface _Props {
    cartItems: cartItemInterface[],
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
    cartItems, openModal, closeModal, // confirmBtn
}) => {
    const [amount, setamount] = useState(getTotalAmount(cartItems));
    const { handleCheckoutBtn } = useCart();


    useEffect(() => {
        setamount(getTotalAmount(cartItems));

        handleCheckoutBtn(cartItems);
    }, [cartItems]);

      
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