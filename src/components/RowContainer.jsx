import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { getDownloadURL, ref as firebaseRef } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import { storage, firestore } from '../firebase';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { motion } from 'framer-motion';
import { IoBagAdd } from 'react-icons/io5';

const RowContainer = forwardRef(({ flag }, ref) => {
  const [products, setProducts] = useState([]);
  const scrollContainer = useRef(null);
  const [, dispatch] = useStateValue();

  //Scrolling through the products
  useImperativeHandle(ref, () => ({
    scrollBy: (options) => {
      scrollContainer.current.scrollBy(options);
    },
  }));

  //Fetching products
  const fetchProducts = async () => {
    const productsCollection = collection(firestore, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  };

  const addToCart = (product) => {
    const cartItem = { ...product, quantity: 1 };
    dispatch({ type: actionType.ADD_TO_CART, cartItem });
  };

  //Fetching item's imgURL from db
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();

      const fetchImages = async (products) => {
        const getImageUrl = async (path) => {
          const imageRef = firebaseRef(storage, path);
          return await getDownloadURL(imageRef);
        };

        const imageUrls = await Promise.all(products.map((product) => getImageUrl(product.imagePath)));
        setProducts(products.map((product, index) => ({ ...product, imageUrl: imageUrls[index] })));
      };

      fetchImages(productsData);
    };

    fetchData();
  }, []);

  return (
    <div
      ref={scrollContainer}
      className={`w-full flex items-center gap-3 my-12 scroll-smooth ${flag
        ? 'overflow-x-scroll scrollbar-none hide-scrollbar'
        : 'overflow-x-hidden whitespace-nowrap'
        }`}
    >
      {products.map((product, index) => (
        <div key={index} className='w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative'>
          <div className="w-full flex items-center justify-between">
            <motion.div
              className="w-40 h-40 -mt-8 drop-shadow-2xl"
              whileHover={{ scale: 1.2 }}
            >
              <img src={product.imageUrl} alt={`Product ${index + 1}`} className="w-full h-full object-contain" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => addToCart(product)}
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
      ))}
    </div>
  );
});

export default RowContainer;
