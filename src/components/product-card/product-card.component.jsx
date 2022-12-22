import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemtoCart } = useContext(CartContext);

    const addProductToCart = () => addItemtoCart(product);

    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='iverted' onClick={addProductToCart}>
                Add to cart
            </Button>
        </div>
    )
}

export default ProductCard;