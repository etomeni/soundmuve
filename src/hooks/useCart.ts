import { useEffect, useState } from "react";
import { cartItemStore } from "@/state/cartStore";
import { cartItemInterface } from "@/constants/typesInterface";


// const cartItems: cartItemInterface[] = [
//     {
//         id: "1",
//         price: "$25.00",
//         // totalPrice: "$25.00",
//         releaseType: "Single",
//         songTitle: "Victory Dance",
//         artWorkImg: albumSampleArt,
//     },
//     {
//         id: "1",
//         price: "$25.00",
//         // totalPrice: "$25.00",
//         releaseType: "Single",
//         songTitle: "Victory Dance",
//         artWorkImg: albumSampleArt,
//     },
//     {
//         id: "1",
//         price: "$25.00",
//         // totalPrice: "$25.00",
//         releaseType: "Single",
//         songTitle: "Victory Dance",
//         artWorkImg: albumSampleArt,
//     },
//     {
//         id: "1",
//         price: "$25.00",
//         // totalPrice: "$25.00",
//         releaseType: "Single",
//         songTitle: "Victory Dance",
//         artWorkImg: albumSampleArt,
//     },
//     {
//         id: "1",
//         price: "$25.00",
//         // totalPrice: "$25.00",
//         releaseType: "Single",
//         songTitle: "Victory Dance",
//         artWorkImg: albumSampleArt,
//     },
// ];


export function useCart() {
    const cartItems = cartItemStore((state) => state.cart);
    const _removeFromCart = cartItemStore((state) => state._removeFromCart);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const handleRemoveCartItem = (item: cartItemInterface) => {
        // console.log(item);
        _removeFromCart(item);
    }

    useEffect(() => {
        const totalPrice = cartItems.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.price;
        }, 0);

        setTotalAmount(totalPrice);
    }, [cartItems]);


    // const reAuthUser = useCallback(() => {
    //     checkUserAuthState()
    // }, []);
    
 
    return {
        cartItems,
        totalAmount,
        handleRemoveCartItem,
    }
}
