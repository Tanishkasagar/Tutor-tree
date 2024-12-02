import React from 'react'  // Importing React library to build components
import { assets } from '../assets/assets'  // Importing assets, like images, from the assets folder

const Footer = () => {
  return (
    <div className='md:mx-10'> 
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> 
            <div>
             <img className='mb-5 w-40' src={assets.logo} alt="" /> 
             <p className='w-full md-2/3 text-gray-600 leading-6'>Start learning today with the best tutors at Tutor Tree. Your future starts now!</p>  {/* Description text */}
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p> 
                <ul className='flex flex-col gap-2 tetx-gray-600'>  
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p> 
                <ul className='flex flex-col gap-2 tetx-gray-600'> 
                    <li>+1-234-345-3333</li>
                    <li>abcd@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />  
            <p className='py-5 text-sm text-center'>&copy; 2024 Tutor Tree. All rights reserved.</p> 
        </div>

    </div>
  )
}

export default Footer;  // Exporting the Footer component
