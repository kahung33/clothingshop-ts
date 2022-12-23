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

const clearCartItem = (cartItems, productToClear) => cartItems.filter((cartItem) => cartItem.id !== productToClear.id);


const removeCartItem = (cartItems, prodcutToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === prodcutToRemove.id );
    if(existingCartItem.quantity > 1){
        return cartItems.map((cartItem) => 
        cartItem.id === prodcutToRemove.id 
            ? {...cartItem, quantity: existingCartItem.quantity - 1 }
            : cartItem
        );
    }
    return cartItems.filter((cartItem) => cartItem.id !== prodcutToRemove.id);
}

export const CartContext = createContext({
    addItemtoCart: () => {},
    cartItems : [],
    setIsCartOpen: () => {},
    isCartOpen : false,
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    total: 0,

});


export const CartProvider = ( { children } ) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setcartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity ,0)
        setcartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const cartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
        setCartTotal(cartTotal);
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    }

    const removeItemFromCart = (prodcutToRemove) => {
        setCartItems(removeCartItem(cartItems,prodcutToRemove));
    }

    const value = { cartItems, addItemToCart, isCartOpen, setIsCartOpen, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}