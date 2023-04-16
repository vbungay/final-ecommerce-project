import React from 'react';
import Sublogo from '../assets/Sublogo.png';
import About from '../assets/about.jpg';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
            <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
                <div className='flex items-center gap-2 justify-center bg-green-200 px-4 py-1 rounded-full'>
                    <p className='text-base text-green-900 font-semibold'>Since '97</p>
                    <div className='w-10 h-10 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                        <img
                            src={Sublogo}
                            className='w-full h-full object-contain'
                            alt="sublogo" />
                    </div>
                </div>

                <p className='text-[2.5rem] lg:text-[4.2rem] font-bold tracking-wide text-headingColor'>
                    Started from the bottom{" "}
                    <span className='text-orange-600 text-[3rem] lg:text-[4.6rem]'>Now we here.</span>
                </p>

                <p className='text-base text-textColor md:w-[80%]'>
                    Shoe Ground was founded with a simple mission: to provide high-quality, stylish shoes at affordable prices.
                    At Shoe Ground, we believe that everyone deserves to have access to comfortable footwear that fits their lifestyle.
                </p>

                <Link to="/ContactUs">
                    <button type="button"
                        className='bg-gradient-to-br from-green-200 to-green-400 w-full md:w-auto p-4 
                           px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'
                    >Contact Us
                    </button>
                </Link>

            </div>
            <div className='py-2 flex-1 flex items-center relative'>
                <img src={About} className='ml-auto h-auto w-full lg:w-full lg:h-auto' alt='background' />
            </div>
        </section>
    )
}

export default AboutUs