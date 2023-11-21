// Header.js
'use client';
import React, {useState} from 'react';
import {  MenuIcon, XIcon } from '@heroicons/react/solid';
//@ts-ignore
const Header = ({ isOpen, toggleSidebar }) => {
    
    const handleToggle = () => {
        toggleSidebar(!isOpen); // Emit the open/close event to the parent
      };
    
  return (
    <div className="bg-blue-500 text-white p-4">
           <button className="p-2 md:hidden" onClick={handleToggle}>
                {isOpen ? (
                <XIcon className="w-6 h-6 text-gray-300" />
                ) : (
                <MenuIcon className="w-6 h-6 text-gray-300" />
                )}
            </button>
        <p className='text-center'>Header</p>
    </div>
  );
};

export default Header;
