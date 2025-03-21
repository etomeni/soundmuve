import { cartItemInterface } from "./cartInterface";
import { payoutDetailsInterface } from "./payout.interface";

export type transactionInterface = {
    _id: string;
    
    user_id: string;
    user_email: string;

    transactionType: "Withdrawal" | "Credit" | "Debit" | "Payment";

    description: string;
    amount: number;

    
    credit?: {
        analytics_id: string;
        release_id: string;
        // revenue: string;
    }

    withdrawal?: {
        payout_id: string;

        exchangeRate: withdrawExchangeInterface,

        narration: string;

        paymentMethod: string;
        currency: string;
        accountNumber: string;
        beneficiaryName: string;
        bankName: string;
        beneficiaryEmail: string;
    };

    payment?: {
        cartItems: cartItemInterface[],
        paidAmount: number,
        totalAmount: number,
        paymentIntent: string;
        paymentIntentClientSecret: string;
        paymentStatus: string;
        currency: string;
    },

    status: "Pending" | "Processing" | "Success" | "Complete" | "Failed",

    updatedBy: {
        user_id: string,
        user_email: string,
        name: string
    },
    
    createdAt: string;
    updatedAt: string;
}


export type withdrawExchangeInterface = {
    rate: number,
    source: {
        currency: string,
        amount: number
    },
    destination: {
        currency: string,
        amount: number
    }
}

export type withdrawInterface = {
    currency: string;
    narration: string;
    amount: string;
    exchangeRate: withdrawExchangeInterface;
    // paymentDetails?: any
    paymentDetails?: payoutDetailsInterface
}
