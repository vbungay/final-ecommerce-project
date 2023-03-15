import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import Avatar from '../assets/avatar.png'
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const handleLogin = async () => {
        if(!user) {
            const { user: {refreshToken, providerData} } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]))
        }else {
            setIsMenu(!isMenu);
        }
    };

  return (
    <header className='fixed z-50 w-screen p-6 px-16'>
        <div className='hidden md:flex w-full h-full items-center justify-between'>
            {/* header logo */}
            <Link to={'/'} className='flex items-center gap-2'>
                <img src={ Logo } className='w-20 object-cover' alt="logo" />
                <p className='text-headingColor text-xl font-bold'>Shoe Ground</p>
            </Link>
            <div className='flex items-center gap-8'>
                {/* header links */}
                <motion.ul
                    initial={{ opacity: 0, x: 150}}
                    animate={{ opacity: 1, x: 0}}
                    exit={{ opacity: 0, x: 150}}
                    className='flex items-center gap-8 ml-auto'
                >
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>
                        Home
                    </li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>
                        Products
                    </li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>
                        About Us
                    </li>
                </motion.ul>
                {/* header cart */}
                <motion.div
                    initial={{ opacity: 0, x: 150}}
                    animate={{ opacity: 1, x: 0}}
                    exit={{ opacity: 0, x: 150}}
                    className='relative flex items-center justify-center'
                >
                    <BsFillCartPlusFill className='text-textColor text-2xl cursor-pointer' />
                    <div className='absolute -top-1 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-cartNotif'>
                        <p className='text-xs text-white font-semibold'>1</p>
                    </div>
                </motion.div>
                {/* user avatar */}
                <motion.div 
                    initial={{ opacity: 0, x: 150}}
                    animate={{ opacity: 1, x: 0}}
                    exit={{ opacity: 0, x: 150}} 
                    className='relative'
                >
                    <motion.img whileTap={{scale: 0.7}} 
                                src={ user ? user.photoURL: Avatar } 
                                className='w-8 min-w-[38px] h-8 min-h-[38px] rounded-full' 
                                alt="user"
                                referrerPolicy="no-referrer"
                                onClick={handleLogin} 
                    />
                    {/* if user is logged in, logout will appear upon clicking the avatar icon */}
                    {
                        isMenu && (
                            <motion.div className='flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg absolute top-10 right-0'>
                                <p className='px-4 py-2 flex items-center gap-3 cursoe-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'>
                                    Logout <AiOutlineLogout />
                                </p>
                            </motion.div>
                        )
                    }
                </motion.div>
            </div>
        </div>
        <div className='flex md:hidden w-full h-full p-4'></div>
    </header>
  )
}

export default Header;