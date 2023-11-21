'use client';
import React from 'react';
import Link from 'next/link'
//@ts-ignore
const SidebarItem = ({ isOpen, icon: Icon, text, href,active }) => {
    return (
        <Link href={href}>
        <li className={`${active?'bg-gray-400 ':' '} flex items-center py-2 px-4 text-gray-300  hover:bg-gray-700 hover:text-white relative`}>
            <Icon className="w-6 h-6 mr-2 text-gray-500" />
            <span className={`transition-all absolute left-[10px]  duration-500 ${isOpen ? 'translate-x-[40px]' : ' translate-x-[25px]'}`}>
                <span
                className={`transition-all duration-600 ${isOpen ? 'opacity-100' : 'opacity-0'}`}            
                style={{ transitionDelay: isOpen ? '0.2s' : '0.1s' }}
                >
                {text}
                </span>

            </span>
        </li>
      </Link>
    );
  };
  
  export default SidebarItem;