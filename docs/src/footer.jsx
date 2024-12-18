import React from 'react'
import landing from './assets/landing-Photoroom.png';
const Footer = () => {
  return (
    <footer className='bg-[#183149] font-serif'>
        <div className='container py-14 '>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 text-paragraphColor'>
                <div className='space-y-3 lg:max-w-[300px]'>
                    <img src={landing} alt=""  className='w-24'/>
                    <p>Better Solutions to
                    Secure PC Registration</p>
                    <a href="" className='inline-block mt-6 text-sm '>team1@team1.com</a>
                </div>
                <div className='col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6'>
                    <div>
                    <h1 className='text-xl font-semibold'>Links</h1>
                    <ul className='space-y-3 mt-6'>
                        <li className='footer-link'>Home</li>
                        <li className='footer-link'>About</li>
                        <li className='footer-link'>Contact-us</li>
                        <li className='footer-link'>Menu</li>

                    </ul>
                    </div>
                    <div>
                    <h1 className='text-xl font-semibold'>Contact us</h1>
                    <ul className='space-y-3 mt-6'>
                        <li className='footer-link'>0930902480</li>
                        <li className='footer-link'>team1@team1.com</li>
                        <li className='footer-link'>AASTU</li>
                        <li className='footer-link'></li>

                    </ul>
                    </div>
                    <div>
                    <h1 className='text-xl font-semibold'>Follow us</h1>
                    <ul className='space-y-3 mt-6'>
                        <li className='footer-link'>Github</li>
                        <li className='footer-link'>Linkedin</li>
                        <li className='footer-link'>Telegram</li>
                        <li className='footer-link'>Instagram</li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className='w-[100%] h-1 bg-gray-400 mt-7'>
                
            </div>
            <div className='flex justify-between text-paragraphColor p-5'>
                <div>
                  Prepared by Team 1 AASTU 5th year Software Engineering Student
                </div>
                <div>
                    Copy right resererved @2024
                </div>
            </div>
            
        </div>
    </footer>
  )
}

export default Footer