'use client';
// Sidebar.js
import React, { useState, useEffect } from 'react';
import { HomeIcon, ChartSquareBarIcon,UserIcon } from '@heroicons/react/solid';
import SidebarItem from './SidebarItem'; 
import Image from 'next/image';
const Sidebar = () => {
    
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      setIsOpen(window.innerWidth > 768);
    }, []);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    
    return (
      <div className={`bg-gray-800 text-white h-full ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
        <button className="p-2" onClick={toggleSidebar}>          
        {isOpen ? <Image src='/icons/minimize.svg' width={14} height={14} alt='maximize' className='w-6 h-6 text-white' /> :  <Image src='/icons/expand.svg' width={14} height={14} className='w-6 h-6 text-white' alt='minimize' /> }
        </button>
        <nav>
          <ul className="mt-6">
            
            <SidebarItem isOpen={isOpen} icon={HomeIcon} text="Home" href="/" />
            <SidebarItem isOpen={isOpen} icon={ChartSquareBarIcon} text="Dashboard" href="/dashboard" />
            <SidebarItem isOpen={isOpen} icon={UserIcon} text="Users" href="/users" />
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
