import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
    const { id, title, quantity, total, price } = props.item;
    const dispatchFn = useDispatch();

    const onAddItem = () => {
        dispatchFn(
            cartActions.addItemToCart({
                id,
                title,
                price,
            })
        );
    };

    const onRemoveItem = () => {
        dispatchFn(cartActions.removeItemFromCart(id));
    };

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{' '}
                    <span className={classes.itemprice}>
                        (${price.toFixed(2)}/item)
                    </span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={onRemoveItem}>-</button>
                    <button onClick={onAddItem}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
