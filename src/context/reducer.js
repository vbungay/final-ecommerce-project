import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';

//Saving products to firebase db
const saveCartToDatabase = async (cart) => {
    try {
        const cartCollection = collection(firestore, 'cart');
        await addDoc(cartCollection, { items: cart });
    } catch (error) {
        console.error('Error saving cart to the database:', error);
    }
};

//different types of actions that are being dispatched using reducer.
export const actionType = {
    SET_USER: 'SET_USER',
    ADD_TO_CART: 'ADD_TO_CART',
    INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
    DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        //Adds an item to the shopping cart by creating a new array
        case actionType.ADD_TO_CART:
            const currentCart = state.cart || [];
            const updatedCart = [...currentCart, action.cartItem];
            saveCartToDatabase(updatedCart);
            return {
                ...state,
                cart: updatedCart,
            };
        //Clears the shopping cart by setting the cart property of the state object to an empty array.
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };
        //Increments the quantity of a cart item by one. The updated cart is then saved
        case actionType.INCREMENT_QUANTITY:
            const updatedIncrementCart = state.cart.map((item, index) => {
                if (index === action.index) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            saveCartToDatabase(updatedIncrementCart);
            return {
                ...state,
                cart: updatedIncrementCart,
            };
        //Deccrements the quantity of a cart item by one. The updated cart is then saved
        case actionType.DECREMENT_QUANTITY:
            const updatedDecrementCart = state.cart.map((item, index) => {
                if (index === action.index && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            saveCartToDatabase(updatedDecrementCart);
            return {
                ...state,
                cart: updatedDecrementCart,
            };
        case actionType.REMOVE_FROM_CART:
            const updatedRemoveCart = state.cart.filter((_, index) => index !== action.index);
            saveCartToDatabase(updatedRemoveCart);
            return {
                ...state,
                cart: updatedRemoveCart,
            };
        default:
            return state;
    }
}

export default reducer;
