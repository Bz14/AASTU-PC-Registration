import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { FaArrowUp } from 'react-icons/fa';

const AboutUs = () => {
  const form = useRef();
  
  // State for form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_oh2ylyg', 
        'template_qxbodf7', 
        form.current,
        '7UTyna5Gp0DQsuBGV'
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        },
        (error) => {
          alert('Failed to send message. Please try again later.');
          console.log(error); 
        }
      );
  };

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
          <form ref={form} onSubmit={sendEmail} className='bg-white p-6 rounded shadow'>
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name' 
                value={formData.name}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
                placeholder='Your Name'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
                placeholder='Your Email'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2' htmlFor='message'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded'
                rows='4'
                placeholder='Your Message'
                required
              ></textarea>
            </div>
            <button type='submit' className='bg-buttonBackground text-white py-2 px-4 rounded'>
              Send Message
            </button>
          </form>

          <div>
            {isVisible && (
              <div
                className="fixed bottom-10 right-10 bg-black text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-purple-700 transition duration-300"
                onClick={scrollToTop}
              >
                <FaArrowUp size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
