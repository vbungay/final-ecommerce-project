import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';

const saveCartToDatabase = async (cart) => {
    try {
        const cartCollection = collection(firestore, 'cart');
        await addDoc(cartCollection, { items: cart });
    } catch (error) {
        console.error('Error saving cart to the database:', error);
    }
};

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
        case actionType.ADD_TO_CART:
            const currentCart = state.cart || []; // Ensure cart is an array
            const updatedCart = [...currentCart, action.cartItem];
            saveCartToDatabase(updatedCart);
            return {
                ...state,
                cart: updatedCart,
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };
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
