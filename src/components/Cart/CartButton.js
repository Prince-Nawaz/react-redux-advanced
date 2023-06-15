import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
    const cartItemsLength = useSelector((state) => state.cart.items.length);
    const disptachFn = useDispatch();

    const toggleCartHandler = () => {
        disptachFn(uiActions.toggle());
    };
    return (
        <button className={classes.button} onClick={toggleCartHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{cartItemsLength}</span>
        </button>
    );
};

export default CartButton;
