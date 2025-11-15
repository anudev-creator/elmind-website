'use client'; 

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsMobileProductOpen(false);
  }

  return (
    <>
      <div className="w-full flex justify-center sticky top-0 z-50 py-2 bg-tr">
        <div className="flex justify-between items-center bg-white rounded-xl w-[90%] lg:w-[80%] shadow-md p-4">
          {/* Logo */}
          <Link href="/" onClick={closeAllMenus}>
            <Image
              src="/Images/Home/Mainlog.png"
              alt="Main Logo"
              width={100}
              height={50}
              className="h-auto"
            />
          </Link>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8">
            <Link href={"/"} className="hover:text-[#2AA5A3] transition-colors">Home</Link>
            
            {/* MODIFIED: This is the new parent wrapper for the dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductDropdownOpen(true)}
              onMouseLeave={() => setIsProductDropdownOpen(false)}
            >
              <button className="flex items-center hover:text-[#2AA5A3] transition-colors focus:outline-none">
                Product
                <Image
                  src="/Images/Home/DownArrow.png"
                  alt="Dropdown arrow"
                  width={20}
                  height={20}
                  className={`ml-1 transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              <div className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-lg shadow-xl py-2
                transition-all duration-200 ease-in-out
                ${isProductDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
              `}>
                <Link href="/underconstruction" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#2AA5A3]">Elmind Student App</Link>
                <Link href="/underconstruction" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#2AA5A3]">Elmind Teacher App</Link>
                <Link href="/ElmindSchool" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#2AA5A3]">Elmind School</Link>
              </div>
            </div>

            <Link href={"/underconstruction"} className="hover:text-[#2AA5A3] transition-colors">Report</Link>
            <Link href={"/underconstruction"} className="hover:text-[#2AA5A3] transition-colors">Contact</Link>
            <Link href={"/underconstruction"}>
              <div className="bg-[#2AA5A3] shadow-[5px_4px_0px_0px_#000000] px-6 py-2 rounded-lg text-white text-center transition-transform hover:scale-105">
                Book A Demo
              </div>
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Overlay (No changes here) --- */}
      <div className={`
          md:hidden fixed inset-0 bg-white z-[60]
          flex flex-col items-center justify-center
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <button onClick={closeAllMenus} aria-label="Close menu" className="absolute top-6 right-6 p-2">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center gap-8 text-2xl">
            <Link href={"/"} onClick={closeAllMenus}>Home</Link>
            
            <div className="flex flex-col items-center">
              <button 
                  onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                  className="flex items-center"
              >
                  Product
                  <Image
                      src="/Images/Home/DownArrow.png"
                      alt="Dropdown arrow"
                      width={24}
                      height={24}
                      className={`ml-2 transition-transform duration-300 ${isMobileProductOpen ? 'rotate-180' : ''}`}
                  />
              </button>
              {isMobileProductOpen && (
                  <div className="flex flex-col items-center gap-4 mt-4 text-xl text-gray-600">
                      <Link href="/underconstruction" onClick={closeAllMenus}>Elmind Student</Link>
                      <Link href="/underconstruction" onClick={closeAllMenus}>Elmind Teacher</Link>
                      <Link href="/ElmindSchool" onClick={closeAllMenus}>Elmind School</Link>
                  </div>
              )}
            </div>

            <Link href={"/underconstruction"} onClick={closeAllMenus}>Report</Link>
            <Link href={"/underconstruction"} onClick={closeAllMenus}>Contact</Link>
            <Link href={"/underconstruction"} onClick={closeAllMenus}>
              <div className="bg-[#2AA5A3] shadow-[7px_5px_0px_0px_#000000] px-8 py-3 rounded-lg text-white text-center">
                Book A Demo
              </div>
            </Link>
        </div>
      </div>
    </>
  );
}