import React from 'react'
import { IoIosHome } from "react-icons/io";
import { BsUiRadiosGrid } from "react-icons/bs"
import { IoIosTv } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

import Link from 'next/link';
const MobileNavigation = () => {
    const navLinks = [
        { name: 'Home', icon: <IoIosHome/>, href: '/' },
        { name: 'Discover', icon:<BsUiRadiosGrid />, href: '/discover' },
        { name: 'Movie Release', icon: <IoIosTv />, href: '/movie-release' },
        { name: 'Search', icon: <IoIosSearch />, href: '/search' },
      ];
  return (
    <div className='h-20 bg-black/30 backdrop-blur-lg w-full flex justify-between items-center px-10 text-white rounded-2xl'>
      {
        navLinks.map((link, idx) => (
            <div>
                <Link  href={link.href} key={idx} className={`flex flex-col items-center justify-center text-base text-gray-300 hover:text-blue-400 transition py-2 rounded-lg ${link.href === window.location.pathname ? 'text-blue-400' : ''}`}>
                    
                    <div className='flex flex-col gap-2 items-center'>
                    <h2 className='text-xl'>{link.icon}</h2>
                   <h2 className='text-xs'> {link.name}</h2>
                    </div>
                </Link>
            </div>
        ))
      }
    </div>
  )
}

export default MobileNavigation
