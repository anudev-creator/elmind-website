'use client'; // Required for placeholder component event handlers

import Footer from '@/Components/Footer';
import MenuBar from '@/Components/MenuBar';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="no-scrollbar flex min-h-screen flex-col relative items-center bg-white text-slate-800">
      <MenuBar />

      <main className="w-full flex-grow flex items-center justify-center text-center px-4 py-20 md:py-32">
        <div className="flex flex-col items-center">
          <span className="text-9xl font-black text-teal-600 opacity-80">
            404
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
            Page Not Found
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-lg">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          {/* Use <a> for preview, replace with <Link> in your project */}
          <Link href="/">
            <div className="inline-block bg-teal-600 shadow-[5px_4px_0px_0px_#000000] px-10 py-4 rounded-lg text-white text-lg font-semibold text-center transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[6px_5px_0px_0px_#000000]">
              Go Back Home
            </div>
          </Link>
        </div>
      </main>

      <Footer />

      {/* This is the vertical line overlay from your Home page, preserved for consistency */}
      <div className="fixed -z-10 hidden md:flex pointer-events-none justify-center w-full h-screen top-0 left-0">
        <div className="bg-slate-200 w-px h-full"></div>
        <div className="w-[90%] lg:w-[80%] max-w-7xl h-6"></div>
        <div className="bg-slate-200 w-px h-full"></div>
      </div>
    </div>
  );
}