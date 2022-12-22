import { createContext, useState } from "react";

export const CartContext = createContext({
    setCartContent : () => {},
    cartContent : [],
    setIsCartOpen: () => {},
    isCartOpen : false,
});

export const CartProvider = ( { children } ) => {
    const [cartContent, setCartContent] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { cartContent, setCartContent, isCartOpen, setIsCartOpen };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}