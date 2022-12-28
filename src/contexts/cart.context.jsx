import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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
    cartTotal: 0,

});

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    TOGGLE_CART_OPEN:'TOGGLE_CART_OPEN',
    // SET_CART_COUNT:'SET_CART_COUNT',
    // SET_CART_TOTAL:'SET_CART_TOTAL',

}

const INITIAL_STATE = {
    cartItems : [],
    isCartOpen : false,
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state,action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in useReducer`);
    }
}

export const CartProvider = ( { children } ) => {
    // const [cartItems, setCartItems] = useState([]);
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartCount, setcartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{cartItems,isCartOpen,cartCount,cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity ,0)
        const cartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                    cartCount:newCartCount,
                    cartTotal:cartTotal,
                    cartItems:newCartItems}));
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool));
    }

    // const setcartCount = (newCount) => {
    //     dispatch({type:CART_ACTION_TYPES.SET_CART_COUNT, payload:newCount})
    // }
    
    // const setCartTotal = (newTotal) => {
    //     dispatch({type:CART_ACTION_TYPES.SET_CART_TOTAL, payload:newTotal})
    // }


    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity ,0)
    //     setcartCount(newCartCount);
    // }, [cartItems])

    // useEffect(() => {
    //     const cartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
    //     setCartTotal(cartTotal);
    // }, [cartItems])


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (prodcutToRemove) => {
        const newCartItems = removeCartItem(cartItems, prodcutToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const value = { cartItems, addItemToCart, isCartOpen, setIsCartOpen, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}