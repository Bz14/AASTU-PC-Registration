import React from 'react';

const AboutUs = () => {
  return (
    <section id='about-us' className='bg-background py-12 font-serif'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between'>
        
        <div className='flex-1 md:pr-8 mb-8 md:mb-0'>
          <h2 className='text-3xl md:text-4xl font-bold text-titleColor mb-4'>About Us</h2>
          <p className='text-paragraphColor mb-4 text-sm md:text-base'>
            We are a group of 5 AASTU 5th year Software Engineering Student with diverse roles, including Front-end Developers, Back-end Developers, and Mobile Developers. Together, we are dedicated to building a robust and user-friendly system to enhance PC registration security.
          </p>
          <p className='text-paragraphColor mb-4 text-sm md:text-base'>
            Our team is passionate about technology and committed to delivering high-quality solutions that meet user needs. We work collaboratively, leveraging our individual skills and experiences to create a seamless experience for our users.
          </p>
          <p className='text-paragraphColor text-sm md:text-base'>
            If you have any questions or would like to collaborate, feel free to reach out!
          </p>
        </div>

        <div className='flex-1 md:pl-8'>
          <h3 className='text-3xl md:text-4xl font-bold text-titleColor mb-4'>Contact Us</h3>
          <form className='bg-white p-6 rounded shadow'>
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2' htmlFor='name'>Name</label>
              <input type='text' id='name' className='w-full border border-gray-300 p-2 rounded' placeholder='Your Name' required />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2' htmlFor='email'>Email</label>
              <input type='email' id='email' className='w-full border border-gray-300 p-2 rounded' placeholder='Your Email' required />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2' htmlFor='message'>Message</label>
              <textarea id='message' className='w-full border border-gray-300 p-2 rounded' rows='4' placeholder='Your Message' required></textarea>
            </div>
            <button type='submit' className='bg-buttonBackground text-white py-2 px-4 rounded'>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
