import React, { useEffect, useState } from 'react';
import { SiJordan, SiNike } from 'react-icons/si';
import { CgAdidas } from 'react-icons/cg'
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage, firestore } from '../firebase';
import JordanProducts from './JordanProducts';
import NikeProducts from './NikeProducts';
import AdidasProducts from './AdidasProducts';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import '../custom.css';

const FilterMenu = () => {
    const [jordanProducts, setJordanProducts] = useState([]);
    const [nikeProducts, setNikeProducts] = useState([]);
    const [adidasProducts, setAdidasProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("jordan");
    const [, dispatch] = useStateValue();

    //Add to cart function
    const handleAddToCart = (product) => {
        dispatch({
            type: actionType.ADD_TO_CART,
            cartItem: {
                ...product,
                quantity: 1,
            },
        });
    };

    //Fetch Jordan products from firebase
    const fetchJordanProducts = async () => {
        const jordanCollection = collection(firestore, 'jordan');
        const jordanSnapshot = await getDocs(jordanCollection);
        const products = jordanSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return products;
    };

    //Fetch Nike products from firebase
    const fetchNikeProducts = async () => {
        const nikeCollection = collection(firestore, 'nike');
        const nikeSnapshot = await getDocs(nikeCollection);
        const products = nikeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return products;
    };

    //Fetch Adidas products from firebase
    const fetchAdidasProducts = async () => {
        const adidasCollection = collection(firestore, 'adidas');
        const adidasSnapshot = await getDocs(adidasCollection);
        const products = adidasSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return products;
    };

    //Fetch product images from firebase storage
    const fetchImages = async (products, setState) => {
        const getImageUrl = async (path) => {
            const imageRef = ref(storage, path);
            return await getDownloadURL(imageRef);
        };

        const imageUrls = await Promise.all(products.map((product) => getImageUrl(product.imagePath)));
        setState(products.map((product, index) => ({ ...product, imageUrl: imageUrls[index] })));
    };

    //Filtering items by brand
    useEffect(() => {
        fetchJordanProducts().then((products) => {
            fetchImages(products, setJordanProducts);
        });

        fetchNikeProducts().then((products) => {
            fetchImages(products, setNikeProducts);
        });

        fetchAdidasProducts().then((products) => {
            fetchImages(products, setAdidasProducts);
        });
    }, []);

    return (
        <section className="w-full my-6" id="menu">
            <div className="w-full flex flex-col items-center justify-center">
                {/*Section Heading*/}
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute 
                              before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 
                              before:bg-gradient-to-tr before:bg-green-400 transition-all ease-in-out duration-100 mr-auto">
                    Our Collections
                </p>
                <div className="w-full flex flex-col items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll">
                    {/*Product Categories*/}
                    <div className="flex gap-8">
                        {/*Jordan Products*/}
                        <div className={`group bg-card ${selectedCategory === 'jordan' ? 'bg-orange-500' : 'hover:bg-orange-500'} 
                                        w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center 
                                        justify-center duration-150 transition-all ease-in-out`}
                            onClick={() => setSelectedCategory("jordan")}
                        >
                            <div className={`${selectedCategory === 'jordan' ? 'bg-white' : 'bg-orange-500'} w-10 h-10 rounded-full 
                                           bg-orange-500 group-hover:bg-white flex items-center justify-center`}
                            >
                                <SiJordan className={`${selectedCategory === 'jordan' ? "text-headingColor" : "text-white"} 
                                                    group-hover:text-headingColor text-lg`}
                                />
                            </div>
                            <p className={`${selectedCategory === 'jordan' ? 'text-white' : 'text-headingColor'} text-sm group-hover:text-card`}>
                                Jordan
                            </p>
                        </div>
                        {/*Nike Products*/}
                        <div className={`group bg-card ${selectedCategory === 'nike' ? 'bg-orange-500' : 'hover:bg-orange-500'} 
                                        w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center 
                                        justify-center duration-150 transition-all ease-in-out`}
                            onClick={() => setSelectedCategory("nike")}
                        >
                            <div className={`${selectedCategory === 'nike' ? 'bg-white' : 'bg-orange-500'} 
                                             w-10 h-10 rounded-full bg-orange-500 group-hover:bg-white flex items-center justify-center`}
                            >
                                <SiNike className={`${selectedCategory === 'nike' ? "text-headingColor" : "text-white"} 
                                                  group-hover:text-headingColor text-lg`}
                                />
                            </div>
                            <p className={`${selectedCategory === 'nike' ? 'text-white' : 'text-headingColor'} text-sm group-hover:text-card`}>
                                Nike
                            </p>
                        </div>
                        {/*Adidas Products*/}
                        <div className={`group bg-card ${selectedCategory === 'adidas' ? 'bg-orange-500' : 'hover:bg-orange-500'} 
                                        w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center 
                                        justify-center duration-150 transition-all ease-in-out`}
                            onClick={() => setSelectedCategory("adidas")}
                        >
                            <div className={`${selectedCategory === 'adidas' ? 'bg-white' : 'bg-orange-500'} 
                                             w-10 h-10 rounded-full bg-orange-500 group-hover:bg-white flex items-center justify-center`}>
                                <CgAdidas className={`${selectedCategory === 'adidas' ? "text-headingColor" : "text-white"} 
                                                    group-hover:text-headingColor text-lg`}
                                />
                            </div>
                            <p className={`${selectedCategory === 'adidas' ? 'text-white' : 'text-headingColor'} text-sm group-hover:text-card`}>
                                Adidas
                            </p>
                        </div>
                    </div>
                    {/*Diplays Products by brand*/}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 row-gap-1 my-12">
                        {selectedCategory === "jordan" &&
                            jordanProducts.map((product, index) => (
                                <JordanProducts key={index} product={product} flag={false} onAddToCart={handleAddToCart} />
                            ))}
                        {selectedCategory === "nike" &&
                            nikeProducts.map((product, index) => (
                                <NikeProducts key={index} product={product} flag={false} onAddToCart={handleAddToCart} />
                            ))}
                        {selectedCategory === "adidas" &&
                            adidasProducts.map((product, index) => (
                                <AdidasProducts key={index} product={product} flag={false} onAddToCart={handleAddToCart} />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterMenu;
