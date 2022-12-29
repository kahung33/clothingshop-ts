import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, boolean);

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


export const addItemToCart = (cartItems,productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
    }

export const clearItemFromCart = (cartItems,productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);

    }

export const removeItemFromCart = (cartItems,prodcutToRemove) => {
        const newCartItems = removeCartItem(cartItems, prodcutToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
    }


