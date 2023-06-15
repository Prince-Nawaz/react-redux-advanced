import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const sendCartData = (cart) => {
    return async (dispatchFn) => {
        dispatchFn(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-http-d9104-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );
            if (!response.ok) {
                dispatchFn(
                    uiActions.showNotification({
                        status: 'error',
                        title: 'Error!',
                        message: 'Sending cart data failed!',
                    })
                );
            }
        };

        try {
            await sendRequest();
            dispatchFn(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Cart sent successfully!',
                })
            );
            setTimeout(() => {
                dispatchFn(uiActions.hideNotification());
            }, 3000);
        } catch (error) {
            console.log(error);
            dispatchFn(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
            setTimeout(() => {
                dispatchFn(uiActions.hideNotification());
            }, 3000);
        }
    };
};

export const fetchCartData = () => {
    return async (dispatchFn) => {
        dispatchFn(
            uiActions.showNotification({
                status: 'pending',
                title: 'Fetching...',
                message: 'Fetching cart data!',
            })
        );

        const fetchRequest = async () => {
            const response = await fetch(
                'https://react-http-d9104-default-rtdb.firebaseio.com/cart.json'
            );
            if (!response.ok) {
                dispatchFn(
                    uiActions.showNotification({
                        status: 'error',
                        title: 'Error!',
                        message: 'Fetching cart data failed!',
                    })
                );
            }

            const data = await response.json();
            return data;
        };

        try {
            const cartData = await fetchRequest();
            dispatchFn(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity || 0,
                })
            );
            dispatchFn(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Cart fetched successfully!',
                })
            );
            setTimeout(() => {
                dispatchFn(uiActions.hideNotification());
            }, 3000);
        } catch (error) {
            console.log(error);
            dispatchFn(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
            setTimeout(() => {
                dispatchFn(uiActions.hideNotification());
            }, 3000);
        }
    };
};
