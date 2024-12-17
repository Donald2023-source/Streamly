import React from 'react';
import logo from '@/app/Assets/Logo.jpeg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    { name: 'Movie Release', href: '/movie-release' },
  ];

  const path = usePathname();

  return (
    <div className="absolute z-50 w-full backdrop-blur-lg shadow-md p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center space-x-3">
          <Image className="h-16 w-16 rounded-full" src={logo} alt="Logo" />
          <h2 className="text-xl font-bold text-gray-100">Streamly</h2>
        </span>

        <div className="flex items-center gap-7">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`${
                path === link.href ? 'font-bold text-white' : 'text-gray-300'
              } hover:text-blue-400 transition`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div>
            <BiSearch/>
            
        </div>
      </div>

    </div>
  );
};

export default Navbar;
