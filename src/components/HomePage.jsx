import React from 'react';
import Sublogo from '../assets/Sublogo.png';
import Background from '../assets/background.png';
import Item from '../assets/Item.png'

const HomePage = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
        <div className='flex items-center gap-2 justify-center bg-green-200 px-4 py-1 rounded-full'>
          <p className='text-base text-green-900 font-semibold'>100% Authentic</p>
          <div className='w-10 h-10 bg-white rounded-full overflow-hidden drop-shadow-xl'>
            <img 
              src={Sublogo}
              className='w-full h-full object-contain'
              alt="sublogo" />
          </div>
        </div>

        <p className='text-[2.5rem] lg:text-[4.2rem] font-bold tracking-wide text-headingColor'>
          Step up your shoe game with{" "}
          <span className='text-orange-600 text-[3rem] lg:text-[4.6rem]'>Shoe Ground.</span>
        </p>

        <p className='text-base text-textColor md:w-[80%]'>
          Our collection features a wide range of high-quality and stylish shoes, each carefully selected and guaranteed to be authentic.
        </p>

        <button type="button" className='bg-gradient-to-br from-green-200 to-green-400 w-full md:w-auto p-4 px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Shop Now</button>

      </div>
      <div className='py-2 flex-1 flex items-center relative'>
        <img src={Background} className='ml-auto h-370 w-full lg:w-auto lg:h-600' alt='background' />

        <div className='w-450 lg:w-full h-full absolute flex items-center justify-center top-0 -left-16 lg:left-0 px-32 py-4'>
          <div className='w-full p-4 bg-overlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center'>
            <img src={Item} className='w-full -mt-10 lg:w-full lg:-mt-50' alt='item-backdrop' />
            <p className='text-base font-semibold text-headingColor'>Get 30% off!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage