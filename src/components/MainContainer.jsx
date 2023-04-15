import React, { useRef } from 'react';
import HomePage from './HomePage';
import { motion } from 'framer-motion'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import RowContainer from "./RowContainer";
import '../custom.css';
import FilterMenu from './FilterMenu';

const MainContainer = () => {
  const rowContainerRef = useRef(null);
  const scrollAmount = 275;

  //Scroll to left when motion.div is clicked
  const scrollLeft = () => {
    rowContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  //Scroll to right when motion.div is clicked
  const scrollRight = () => {
    rowContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomePage />

      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl tracking-wide font-semibold relative text-headingColor before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-green-400 transition-all ease-in-out duration-100'>
            Best Sellers
          </p>
          <div className='hidden md:flex gap-3 items-center'>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={scrollLeft}
              className='w-8 h-8 rounded-lg bg-green-400 hover:bg-green-700 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'
            >
              <BiChevronLeft className='text-lg text-white' />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={scrollRight}
              className='w-8 h-8 rounded-lg bg-green-400 hover:bg-green-700 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'
            >
              <BiChevronRight className='text-lg text-white' />
            </motion.div>
          </div>
        </div>
        <RowContainer ref={rowContainerRef} flag={true} />
      </section>
      <FilterMenu />
    </div>
  )
}

export default MainContainer