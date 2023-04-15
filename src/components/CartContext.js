import React from 'react';
import { BsArrowLeftCircleFill, BsFillCartDashFill } from 'react-icons/bs';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';

const CartContainer = () => {
  const [{ cartItems }] = useStateValue();

  return (
    <div className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        {/*Back Icon*/}
        <motion.div whileTap={{ scale: 0.75 }}>
          <BsArrowLeftCircleFill className="text-textColor text-3xl" />
        </motion.div>
        {/*Cart Text*/}
        <p className="text-textColor text-lg font-semibold">
          Cart
        </p>
        {/*Clear Cart*/}
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-200 rounded-md 
                     hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear <BsFillCartDashFill />
        </motion.p>
      </div>
      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        {cartItems.map((item) => (
          <div key={item.id} className="w-full p-1 px-2 rounded-lg bg-card flex items-center gap-2">
            {/*Product Image here*/}
            <img src={item.imageUrl} alt={item.title} />
            <div className="flex flex-col gap-2">
              <p className="text-base text-headingColor">
                {item.title}
              </p>
              <p className="text-sm block text-textColor font-semibold">
                {item.price}
              </p>
            </div>
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
              {/*Product Decrement here*/}
              <motion.div whileTap={{ scale: 0.75 }}>
                <BiMinus className="text-textColor" />
              </motion.div>
              <p className="w-5 h-5 rounded-sm text-textColor flex items-center justify-center">
                {item.quantity}
              </p>
              {/*Product Increment here*/}
              <motion.div whileTap={{ scale: 0.75 }}>
                <BiPlus className="text-textColor" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartContainer;
