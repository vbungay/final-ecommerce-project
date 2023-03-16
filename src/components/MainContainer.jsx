import React from 'react';
import HomePage from './HomePage';

const MainContainer = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomePage />

      <section className='w-full'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl tracking-wide font-semibold relative text-headingColor before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-green-400 transition-all ease-in-out duration-100'>
            Best Sellers
          </p>
        </div>
      </section>
    </div>
  )
}

export default MainContainer