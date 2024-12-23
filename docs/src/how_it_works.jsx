import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import landing from './assets/landing-Photoroom.png';
import admin from './assets/1.jpg'
import superAdmin from './assets/2.png'

const HowItWorks = () => {
  const [visibleSections, setVisibleSections] = useState([false, false, false]);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleSections((prev) => {
      const newSections = [...prev];
      newSections[0] = true;
      return newSections;
    }), 0);

    const timer2 = setTimeout(() => setVisibleSections((prev) => {
      const newSections = [...prev];
      newSections[1] = true;
      return newSections;
    }), 800); 

    const timer3 = setTimeout(() => setVisibleSections((prev) => {
      const newSections = [...prev];
      newSections[2] = true;
      return newSections;
    }), 1600); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className='bg-background font-serif'>
      <div className="container max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold text-titleColor text-center mb-16">
          How It Works
        </h2>

       
        <motion.div 
          className="container flex flex-col md:flex-row items-center justify-between mb-16"
          initial="hidden" 
          animate={visibleSections[0] ? "show" : "hidden"}
          variants={SlideDown(0)}
        >
          <div id='student-section' className="flex-1 md:pr-8">
            <h3 className="text-2xl font-semibold text-titleColor font-serif mb-4">Student Registration</h3>
            <div className="text-paragraphColor mb-4">
              <div>Students approach campus security with their PC for registration.</div>
              <div>Security personnel (Admin) inputs student details (name, ID, photo) into the mobile app.</div>
              <div>The Admin registers the student's PC by entering the PC's unique serial number.</div>
              <div>A QR code is generated automatically with the student's ID and PC details.</div>
              <div>The QR code can be printed or emailed to the student for attachment to their PC.</div>
            </div>
            <div className="border-b-[12px] border-dotted w-full h-0 border-paragraphColor"></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className="text-titleColor font-bold text-sm md:text-lg">Step 1</span>
            </div>
            <div className="border-l-[12px] border-dotted h-80 border-paragraphColor"></div>
          </div>
          <div className="flex-1 md:pl-8 md:order-last order-first mb-8 md:mb-0">
            <img
              src={landing}
              alt="Student"
              className="rounded-lg shadow-lg w-full md:w-auto"
            />
          </div>
        </motion.div>

        
        <motion.div 
          className="container flex flex-col md:flex-row-reverse items-center justify-between mb-16"
          initial="hidden" 
          animate={visibleSections[1] ? "show" : "hidden"}
          variants={SlideDown(0.2)}
        >
          <div  id='admin-section' className="flex-1 md:pl-8">
            <h3 className="text-2xl font-semibold text-titleColor mb-4">Admin Role</h3>
            <div className="text-paragraphColor mb-4">
              <div>Admins are responsible for registering new students and their PCs.</div>
              <div>Admins generate QR codes for PCs and ensure proper attachment to each PC.</div>
              <div>During exit checks, Admins scan the QR code to verify the PC's registration.</div>
              <div>If there is a mismatch during verification, Admins can report the incident directly through the app.</div>
            </div>
            <div className="border-b-[12px] border-dotted w-full h-0 border-paragraphColor"></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className="text-titleColor font-bold text-sm md:text-lg">Step 2</span>
            </div>
            <div className="border-l-[12px] border-dotted h-80 border-paragraphColor"></div>
          </div>
          <div className="flex-1 md:pr-8 md:order-last order-first mb-8 md:mb-0">
            <img
              src={admin}
              alt="Admin"
              className="rounded-lg shadow-lg w-full md:w-auto"
            />
          </div>
        </motion.div>

        
        <motion.div 
          className="container flex flex-col md:flex-row items-center justify-between"
          initial="hidden" 
          animate={visibleSections[2] ? "show" : "hidden"}
          variants={SlideDown(0.4)}
        >
          <div id='super-admin-section' className="flex-1 md:pr-8">
            <h3 className="text-2xl font-semibold text-titleColor mb-4">Super Admin Role</h3>
            <div className="text-paragraphColor mb-4">
              <div>Super Admins manage the overall system, including Admin accounts and system settings.</div>
              <div>They have access to all registered student records and can edit or delete records as necessary.</div>
              <div>Super Admins configure the QR code format, perform backups, and manage security protocols.</div>
              <div>Super Admins monitor incident reports generated by Admins and investigate further if needed.</div>
            </div>
            <div className="border-b-[12px] border-dotted w-full h-0 border-paragraphColor"></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className="text-titleColor font-bold text-sm md:text-lg">Step 3</span>
            </div>
            {/* <div className="border-l-[12px] border-dotted h-80 border-paragraphColor"></div> */}
          </div>
          <div className="flex-1 md:pl-8 md:order-last order-first mb-8 md:mb-0">
            <img
              src={superAdmin}
              alt="Super Admin"
              className="rounded-lg shadow-lg w-full md:w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const SlideDown = (delay) => {
  return {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    show: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay,
      }
    }
  };
};

export default HowItWorks;
