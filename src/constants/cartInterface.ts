export interface cartItemInterface {
    id: string,
    email: string,
    artistName: string,
    releaseType: 'Single' | 'Album',
    songTitle: string,
    artWorkImg: any,
    price: number,
    // totalPrice: string
}



interface responseCartItemInterface {
    type: string,
    name: string,
    price: number,
    _id: string
}

export interface add2cartResponseInterface {
    email: string,
    items: responseCartItemInterface[],
    total: number,
    _id: string,
    createdAt: string,
}

export interface applyPromoResponseInterface {
    cart: {
        _id: string,
        email: string,
        items: responseCartItemInterface[],
        total: number,
        createdAt: string,
    },
    originalPrice: number
}
