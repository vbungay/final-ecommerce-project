import React, { useEffect } from 'react';
import { BsArrowLeftCircleFill, BsFillCartDashFill } from 'react-icons/bs';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { firestore } from '../firebase';
import { collection, addDoc, deleteDoc, } from 'firebase/firestore';

const CartContainer = ({ isVisible, setIsVisible }) => {
    const [{ cart = [] }, dispatch] = useStateValue();

    //Increase qty
    const incrementQuantity = (index) => {
        dispatch({ type: 'INCREMENT_QUANTITY', index });
    };

    //Decrease qty
    const decrementQuantity = (index) => {
        if (cart[index].quantity > 1) {
            dispatch({ type: 'DECREMENT_QUANTITY', index });
        } else {
            dispatch({ type: 'REMOVE_FROM_CART', index });
        }
    };

    // Remove all items from the cart in the context
    const clearCart = async () => {
        dispatch({ type: 'CLEAR_CART' });

        // Remove all items from the 'cart' collection in Firestore
        try {
            const cartCollection = collection(firestore, 'cart');
            await deleteDoc(cartCollection);
        } catch (error) {
            console.error('Error clearing cart from the database:', error);
        }
    };

    //Save items to db as we add
    useEffect(() => {
        if (cart.length > 0) {
            const saveCartToDatabase = async () => {
                try {
                    const cartCollection = collection(firestore, 'cart');
                    await addDoc(cartCollection, { items: cart });
                } catch (error) {
                    console.error('Error saving cart to the database:', error);
                }
            };
            saveCartToDatabase();
        }
    }, [cart]);

    return (
        isVisible && (
            <div className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                {/*Back Icon*/}
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => setIsVisible(false)}>
                    <BsArrowLeftCircleFill className="text-textColor text-3xl" />
                </motion.div>
                {/*Cart Text*/}
                <p className="text-textColor text-lg font-semibold">
                    Cart
                </p>
                {/*Clear Cart*/}
                <motion.p
                    whileTap={{ scale: 0.75 }}
                    onClick={clearCart}
                    className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-200 rounded-md 
                               hover:shadow-md cursor-pointer text-textColor text-base"
                >
                    Clear <BsFillCartDashFill />
                </motion.p>
            </div>
            <div className="w-full h-full bg-green-200 rounded-t-[2rem] flex flex-col">
                {cart.map((item, index) => (
                    <div key={index} className="w-full p-1 px-2 rounded-lg flex items-center gap-2 my-4">
                        {/*Product Image*/}
                        <img src={item.imageUrl} alt={`Product ${index + 1}`} className="w-16 h-16 object-contain" />
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-headingColor">
                                {item.title}
                            </p>
                            <p className="text-sm block text-textColor font-semibold">
                                ${item.price}
                            </p>
                        </div>
                        <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                            {/*Product Decrement*/}
                            <motion.div whileTap={{ scale: 0.75 }} onClick={() => decrementQuantity(index)}>
                                <BiMinus className="text-textColor" />
                            </motion.div>
                            <p className="w-5 h-5 rounded-sm text-textColor flex items-center justify-center">
                                {item.quantity || 1} {/*Product Quantity*/}
                            </p>
                            {/*Product Increment*/}
                            <motion.div whileTap={{ scale: 0.75 }} onClick={() => incrementQuantity(index)}>
                                <BiPlus className="text-textColor" />
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-headingColor text-lg font-semibold">Total</p>
                    <p className="text-textColor text-lg font-semibold">
                        ${cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2)}
                    </p>
                </div>
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                >
                    Check Out
                </motion.button>
            </div>
        </div>
        )
        
    )
}

export default CartContainer