'use client'; // <-- ADDED THIS LINE TO FIX THE ERROR

import Image from 'next/image';
import React from 'react'; // Added React for preview
// import Link from "next/link"; // Commented out for preview
// import Image from "next/image"; // Commented out for preview

// Simple SVG component for social media icons for a clean look
const SocialIcon = ({ href, children }) => (
  // Converted Link to <a> for preview
  <a href={href} className="text-gray-400 hover:text-[#2AA5A3] transition-colors duration-300">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-400">
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
        
        {/* Main grid for footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo and Tagline */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Converted Image to <img> for preview */}
              <Image
                src="/Images/Home/Footer/Mainlog.png"
                alt="Elmind Logo"
                width={35}
                height={35}
                onError={(e) => { e.target.src = 'https://placehold.co/35x35/000000/FFFFFF?text=E'; e.target.onerror = null; }}
              />
              <span className="text-white text-2xl font-bold ml-2">lmind.</span>
            </div>
            <p className="text-sm">
              The AI Engine powering smarter schools. Designed for modern education, ready for the world.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2AA5A3] tracking-wider uppercase">Product</h3>
            <ul className="space-y-3">
              {/* Converted Link to <a> for preview */}
              <li><a href="/underconstruction" className="hover:text-[#2AA5A3] transition-colors">Features</a></li>
              <li><a href="/underconstruction" className="hover:text-[#2AA5A3] transition-colors">Pricing</a></li>
              <li><a href="/underconstruction" className="hover:text-[#2AA5A3] transition-colors">Book a Demo</a></li>
              <li><a href="/underconstruction" className="hover:text-[#2AA5A3] transition-colors">How it Works</a></li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2AA5A3] tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              {/* Converted Link to <a> for preview */}
              <li><a href="/underconstruction" className="hover:text-[#2AA5A3] transition-colors">About Us</a></li>
              <li><a href="/underconstruction" className="hover:text-[#2AA5A3] transition-colors">Contact</a></li>
              <li><a href="/underconstruction" className="hover:text-[#2AA5A3] transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#2AA5A3] tracking-wider uppercase">Stay Updated</h3>
            <p className="text-sm">Get the latest news and updates from Elmind.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2AA5A3]"
              />
              <button 
                type="submit"
                className="bg-[#2AA5A3] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#249593] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="mt-12 pt-8 border-t border-[#2AA5A3]/30 flex flex-col-reverse md:flex-row justify-between items-center text-center md:text-left">
          
          {/* MODIFIED: Wrapper for copyright and new legal links */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-4 md:mt-0">
            <p className="text-sm">© {new Date().getFullYear()} Elmind. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {/* Converted Link to <a> for preview */}
              <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-[#2AA5A3] transition-colors">
                Privacy Policy
              </a>
              <a href="/underconstruction" className="text-sm text-gray-400 hover:text-[#2AA5A3] transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center space-x-5">
            <SocialIcon href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            {/* FIXED: Corrected closing tag */}
            </SocialIcon> 
            <SocialIcon href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}