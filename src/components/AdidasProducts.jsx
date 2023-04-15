import React from 'react';
import { motion } from 'framer-motion';
import { IoBagAdd } from 'react-icons/io5';
import '../custom.css';

const AdidasProducts = ({ product, flag }) => {
    return (
        <div
            className='w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-2 px-4 my-4 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative'>
            <div className="w-full flex items-center justify-between">
                <motion.div className="w-40 h-40 -mt-8 drop-shadow-2xl" whileHover={{ scale: 1.2 }}>
                    <img src={product.imageUrl} alt={product.title} className="w-40 h-40 object-contain" />
                </motion.div>
                <motion.div whileTap={{ scale: 0.75 }}
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8">
                    <IoBagAdd className="text-white" />
                </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end -mt-8">
                <p className="text-textColor font-semibold text-base md:text-lg">
                    {product.title}
                </p>
                <div className="flex items-center gap-8">
                    <p className="text-lg text-headingColor font-semibold">
                        <span className="text-sm text-red-500">$</span> {product.price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdidasProducts;
