import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id );

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    
    return [...cartItems,{...productToAdd, quantity : 1}];
};




export const CartContext = createContext({
    addItemtoCart: () => {},
    cartItems : [],
    setIsCartOpen: () => {},
    isCartOpen : false,
    cartCount: 0,
});


export const CartProvider = ( { children } ) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setcartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity ,0)
        setcartCount(newCartCount);
    }, [cartItems])

    const addItemtoCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { cartItems, addItemtoCart, isCartOpen, setIsCartOpen, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}