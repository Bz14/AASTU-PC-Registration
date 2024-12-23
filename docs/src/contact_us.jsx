import React from 'react';

const ContactUs = () => {
  return (
    <section id='about-us' className='bg-background py-12 font-serif'>
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
    </section>
  );
};

export default ContactUs;
