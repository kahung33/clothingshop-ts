import { FC } from 'react';
import { CartItem } from '../../store/cart/cart.types';

import { CartItemContainer, 
         ItemDetails, 
         Name 
        } from "./cart-item.styles";

type CartItemProps = {
    cartItem : CartItem;
};

const CartItem: FC<CartItemProps> = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <Name>{name}</Name>
                <span className='price'>{quantity} x {`$${price}`}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;