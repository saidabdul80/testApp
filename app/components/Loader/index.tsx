import React from 'react';
import './loader.css'
const Loader = () => {
  return (
    <div className='fixed w-full  h-[100vh] z-10 flex justify-center items-center	' style={{background:'#000b'}}>
        <span className="loader">
        </span>
    </div>
  );
};

export default Loader;
