import React from 'react';
import { Header, MainContainer } from './components';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <AnimatePresence mode='wait'>
      <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header />
        <main className='mt-16 md:mt-24 px-8 md:px-16 py-8 w-full'>
          <Routes>
            <Route path="/*" element={ <MainContainer /> } />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
