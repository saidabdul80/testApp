'use client';
import { useEffect, useState } from 'react';

import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Sidebar from './components/SideBar'
import Loader from './components/Loader';
import CustomModal from './components/CustomModal';


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true);

  //@ts-ignore
  const toggleSidebar = (value) => {
    setIsOpen(value);
  };
  return (
    <html lang="en">
      <head>
        <title>Title</title>
        <meta name='description' content='Description' />
      </head>
      <body className={inter.className}>
        <div id='generalLoader' style={{display:'none'}}>
          <Loader></Loader>
        </div>           
        <div className='flex'>
          {/* Sidebar */}
          <div className={`hidden md:block`}>
            <Sidebar />
          </div>
          <div className={`block md:hidden`} >
            {isOpen ? <Sidebar /> : ''}
          </div>
          {/* Main Content Area */}
          <div className="flex flex-col w-full">
            {/* Header */}
            <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
            {/* Main Content */}
            <div className="flex-grow overflow-auto h-[92vh]">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
