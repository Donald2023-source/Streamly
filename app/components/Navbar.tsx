"use client";

import React, { useState } from "react";
import logo from "@/app/Assets/Logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMenuAltLeft, BiSearch } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Movie Release", href: "/movie-release" },
  ];

  const path = usePathname();
  const [isNav, setIsNav] = useState(false);

  return (
    <div className="fixed z-50 w-full backdrop-blur h-fit shadow-md md:px-12 px-2 py-2 md:p-3">
      <div className="flex items-center h-full justify-between">
        <Link href="/">
          <span className="flex items-center space-x-3">
            <Image
              className="md:h-16 md:w-16 w-10 h-10 rounded-full"
              src={logo}
              alt="Logo"
            />
            <h2 className="text-xl font-bold text-gray-100">Streamly</h2>
          </span>
        </Link>

        <BiMenuAltLeft
          onClick={() => setIsNav(!isNav)}
          className="text-white text-2xl cursor-pointer lg:hidden hover:scale-125"
        />

        <div
          className={`${
            isNav ? "flex " : " flex translate-x-32"
          } flex-col lg:flex lg:flex-row absolute items-end lg:static top-20 lg:translate-x-0 translate-x-50 left-0 right-0 lg:top-auto lg:left-auto lg:right-auto transition duration-300 lg:items-center gap-7 bg-gradient-to-0 lg:bg-transparent p-4 lg:p-0 rounded-md lg:rounded-none`}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`${
                path === link.href ? "font-bold text-white" : "text-gray-300"
              } hover:text-blue-400 transition`}
              onClick={() => setIsNav(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-5">
          <BiSearch className="text-2xl text-white cursor-pointer" />
          <Button className="bg-gradient-to-tr p-4 hover:scale-105 from-blue-700 to-purple-900 text-white">
            Sign Up
          </Button>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
