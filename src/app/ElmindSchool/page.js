'use client';

import React, { useEffect, useState } from 'react';
import '@/app/globals.css';
import MenuBar from '@/Components/MenuBar';
import Footer from '@/Components/Footer';
import Image from 'next/image';


const CheckIcon = () => (
  <svg className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
  </svg>
);

// SVG Icons for features
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H3V9a4 4 0 014-4h6a4 4 0 014 4v2a4 4 0 00-4 4h-2M9 17v2a4 4 0 004 4h2a4 4 0 004-4v-2M9 17h6" />
  </svg>
);

const InsightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

const AiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// --- Page Component ---

// ** 1. DEFINE YOUR IMAGES HERE **
// Add the paths to the images you want to cycle in the hero section.
// Make sure these images are in your /public folder.
const heroImages = [
  '/Images/School/elmind-dashboard-light.png', // Replace with your light theme image
  '/Images/School/elmind-dashboard-dark.png'  // Replace with your dark theme image
];
export default function ElmindSchoolPage() {

  // --- Scroll Animation Logic ---
  useEffect(() => {
    // Check if window is defined (for server-side rendering)
    if (typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    );

    const elementsToAnimate = document.querySelectorAll('[data-animate]');
    elementsToAnimate.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup observer on component unmount
    return () => {
      elementsToAnimate.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []); // Empty dependency array ensures this runs only once


  // ** 2. IMAGE SWITCHER LOGIC **
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to switch the image every 3 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change 3000 (milliseconds) to adjust speed

    // Clear the interval when the component unmounts
    return () => clearInterval(imageInterval);
  }, []); // Empty dependency array ensures this runs only once


  const features = [
    {
      Icon: DashboardIcon,
      title: "Centralized Dashboard",
      description: "View student statistics, manage announcements, and oversee events from one command center.",
      delay: 0
    },
    {
      Icon: InsightIcon,
      title: "Real-Time Insights",
      description: "Monitor class-wise and subject-wise progress to identify areas for improvement instantly.",
      delay: 100
    },
    {
      Icon: AiIcon,
      title: "AI-Driven Advisor",
      description: "Receive personalized, AI-powered advice on attendance, performance, and school operations.",
      delay: 200
    }
  ];

  return (
    <>

      {/* --- Page Content --- */}
      <div className="no-scrollbar flex min-h-screen flex-col relative items-center bg-white text-slate-800">
        <MenuBar />

        <main className="w-full flex-grow">

          {/* --- Hero Section --- */}
          <section className="w-full max-w-7xl mx-auto px-4 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div data-animate className="text-center md:text-left">
              <span className="text-sm font-bold uppercase text-teal-600">Elmind for Schools</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mt-3 mb-8 leading-tight">
                Your Entire School.
                One Dashboard.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-lg mx-auto md:mx-0">
                The ultimate tool for Headmasters to monitor performance, track progress, and streamline administration, all powered by AI.
              </p>
              <a href={"/underconstruction"}>
                <div className="inline-block bg-teal-600 shadow-[5px_4px_0px_0px_#000000] px-10 py-4 rounded-lg text-white text-lg font-semibold text-center transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[6px_5px_0px_0px_#000000]">
                  Book A Demo
                </div>
              </a>
            </div>
            
            {/* ** 4. UPDATED IMAGE SWITCHER JSX ** */}
            <div data-animate style={{ transitionDelay: '100ms' }} className="flex justify-center">
              <div className="hero-image-switcher">
                {heroImages.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    width={350}
                    height={700}
                    alt={index === 0 ? 'Elmind Dashboard Light Mode' : 'Elmind Dashboard Dark Mode'}
                    className={index === currentImageIndex ? 'is-visible' : ''}
                    onError={(e) => e.target.src = 'https://placehold.co/400x700/000000/FFFFFF?text=Elmind+Dashboard'}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* --- Trusted By Section --- */}
          <section data-animate className="py-16 bg-slate-50">
            <div className="w-full max-w-7xl mx-auto px-4 text-center">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                Trusted by leading educational institutions
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mt-6 opacity-60">
                <span className="font-semibold text-lg text-slate-500">BrightStart Academy</span>
                <span className="font-semibold text-lg text-slate-500">Summit Schools</span>
                <span className="font-semibold text-lg text-slate-500">FutureLearn Group</span>
                <span className="font-semibold text-lg text-slate-500">Apex Education</span>
              </div>
            </div>
          </section>

          {/* --- Features Section --- */}
          <section className="w-full max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
            <h2 data-animate className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">A Smarter Way to Lead</h2>
            <p data-animate style={{ transitionDelay: '100ms' }} className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto mb-16">
              From academic progress to administrative alerts, get the high-level overview and deep-dive insights you need.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  data-animate 
                  style={{ transitionDelay: `${feature.delay}ms` }} 
                  className="bg-slate-50 p-8 rounded-lg"
                >
                  <feature.Icon />
                  <h3 className="text-2xl font-semibold text-slate-900 mt-5 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- Detailed Feature 1 --- */}
          <section className="w-full max-w-7xl mx-auto px-4 pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div data-animate className="flex justify-center md:order-2">
              <Image
                src="/Images/School/Classprogress.png"
                alt="Real-Time Learning Insights"
                width={400} 
                height={700} 
                className="rounded-xl shadow-2xl object-contain"
                onError={(e) => e.target.src = 'https://placehold.co/400x700/eeeeee/999999?text=Class+Progress'}
              />
            </div>
            <div data-animate style={{ transitionDelay: '100ms' }} className="md:order-1">
              <span className="text-sm font-bold uppercase text-teal-600">MONITOR PROGRESS</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-8 leading-tight">
                Real-Time Insights for Every Class
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                No more waiting for end-of-term reports. Get immediate access to chapter-wise completion and academic performance across all classes.
              </p>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-center text-lg"><CheckIcon /><span>Track subject completion in real-time.</span></li>
                <li className="flex items-center text-lg"><CheckIcon /><span>Identify top-performing classes and subjects.</span></li>
                <li className="flex items-center text-lg"><CheckIcon /><span>Make data-driven decisions for academic planning.</span></li>
              </ul>
            </div>
          </section>

          {/* --- Detailed Feature 2 (AI) --- pb-24 md:pb-32 */}
          <section className="w-full max-w-7xl mx-auto px-4  grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div data-animate className="flex justify-center">
              <Image
                src="/Images/School/AI_insights.png"
                alt="Elmind AI Advisor"
                width={600} 
                height={400} 
                className="rounded-xl shadow-2xl object-contain"
                onError={(e) => e.target.src = 'https://placehold.co/600x400/eeeeee/999999?text=AI+Insights'}
              />
            </div>
            <div data-animate style={{ transitionDelay: '100ms' }}>
              <span className="text-sm font-bold uppercase text-teal-600">AI-POWERED</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-8 leading-tight">
                Go from data to action, faster.
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Elmind&apos;s AI engine analyzes attendance, grades, and engagement to provide actionable insights. Proactively support students and staff, and build a smarter, more responsive school environment.
              </p>
              <a href="#" className="text-lg font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                Learn more about our AI
              </a>
            </div>
          </section>

          {/* --- NEW: Ecosystem Navigation Section --- */}
          {/* <section className="w-full bg-white pb-24 md:pb-32">
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h2 data-animate className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
                  Complete Your School's Toolkit
                </h2>
                <p data-animate style={{ transitionDelay: '100ms' }} className="text-lg lg:text-xl text-slate-600 mx-auto mb-16">
                  Elmind provides dedicated apps for every member of your school community, all connected to one intelligent platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div data-animate style={{ transitionDelay: '200ms' }} className="bg-slate-50 rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="p-8 md:p-12">
                    <span className="text-sm font-bold uppercase text-teal-600">FOR TEACHERS</span>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2 mb-4">Elmind for Teachers</h3>
                    <p className="text-slate-600 text-lg mb-6">
                      Empower your educators with tools for lesson planning, tracking student progress, and seamless communication.
                    </p>
                    <a href="/underconstruction" className="text-lg font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                      Learn More &rarr;
                    </a>
                  </div>
                  <div className="mt-auto">
                    <Image 
                      src="/Empowering schools with AI-driven insights for smarter learning.-3.jpg" 
                      alt="Elmind Teacher App" 
                      className="w-full h-auto object-cover"
                      onError={(e) => e.target.src = 'https://placehold.co/600x400/eeeeee/999999?text=Teacher+App'}
                    />
                  </div>
                </div>
                <div data-animate style={{ transitionDelay: '300ms' }} className="bg-slate-50 rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <div className="p-8 md:p-12">
                    <span className="text-sm font-bold uppercase text-teal-600">FOR STUDENTS</span>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2 mb-4">Elmind for Students</h3>
                    <p className="text-slate-600 text-lg mb-6">
                      Engage students with a personalized learning companion for assignments, reports, and daily updates.
                    </p>
                    <a href="/underconstruction" className="text-lg font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                      Learn More &rarr;
                    </a>
                  </div>
                  <div className="mt-auto">
                    <Image 
                      src="/Empowering schools with AI-driven insights for smarter learning.-1.jpg" 
                      alt="Elmind Student App" 
                      className="w-full h-auto object-cover"
                      onError={(e) => e.target.src = 'https.placehold.co/600x400/eeeeee/999999?text=Student+App'}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section> */}
          
          {/* --- Final CTA Section --- */}
          <section className="w-full bg-slate-50">
            <div className="w-full max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
              <h2 data-animate className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                See Elmind in Action
              </h2>
              <p data-animate style={{ transitionDelay: '100ms' }} className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                Ready to empower your leadership? Schedule a personalized demo to see how Elmind can be tailored for your school&apos;s unique needs.
              </p>
              <a href={"/underconstruction"} data-animate style={{ transitionDelay: '200ms' }}>
                <div className="inline-block bg-teal-600 shadow-[5px_4px_0px_0px_#000000] px-10 py-4 rounded-lg text-white text-lg font-semibold text-center transform transition-all duration-300 hover:scale-[1.03] hover:shadow-[6px_5px_0px_0px_#0DELETE00]">
                  Book Your Free Demo
                </div>
              </a>
            </div>
          </section>

        </main>

        <Footer />

        {/* This is the vertical line overlay from your Home page, preserved for consistency */}
        <div className="fixed -z-10 hidden md:flex pointer-events-none justify-center w-full h-screen top-0 left-0">
          <div className="bg-slate-200 w-px h-full"></div>
          <div className="w-[90%] lg:w-[80%] max-w-7xl h-6"></div>
          <div className="bg-slate-200 w-px h-full"></div>
        </div>
      </div>
    </>
  );
}