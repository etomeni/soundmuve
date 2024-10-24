export type flutterwavePaymentDetailsInterface = {
    bank: string;
    accountNumber: string;
    accountName: string;
    currency: string;
    verificationNumber: string;
    countryCode: string;
}


export type balTransactionsInterface = {
    _id: string,
    email: string,
    narration: string,
    credit: number,
    debit: number,
    amount: number,
    balance: number,
    currency: string,
    status?: string,
    created_at: string,
}

export type recordLabelArtistInterface = {
    _id?: string,
    email: string,
    artistName: string,

    recordLabelemail?: string,
    phoneNumber?: string,
    country?: string,
    gender?: string,
    artistAvatarUrl: string,

    songCount: number,
}
