import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { withMatcher, createAction, ActionWithPayload } from "../../utils/reducer/reducer.utils"; 
import { CategoryItem } from "../categories/category.types";



const addCartItem = (
    cartItems: CartItem[] ,
    productToAdd: CategoryItem
    ) : CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    
    return [...cartItems,{...productToAdd, quantity : 1}];
};

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem) : CartItem[] => cartItems.filter((cartItem) => cartItem.id !== productToClear.id);


const removeCartItem = (cartItems: CartItem[], prodcutToRemove: CartItem) : CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === prodcutToRemove.id );
    
    if (existingCartItem && existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== prodcutToRemove.id);
    } 
        
    return cartItems.map((cartItem) => 
        cartItem.id === prodcutToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.TOGGLE_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher(
    (boolean: boolean) : SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, boolean)
    );

export const setCartItems = withMatcher(
    (cartItems: CartItem[]) : SetCartItems => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
    );

export const addItemToCart = (cartItems: CartItem[],productToAdd: CategoryItem) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        return setCartItems(newCartItems);
    };

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        return setCartItems(newCartItems);

    };

export const removeItemFromCart = (cartItems: CartItem[], prodcutToRemove: CartItem) => {
        const newCartItems = removeCartItem(cartItems, prodcutToRemove);
        return setCartItems(newCartItems);
    };


