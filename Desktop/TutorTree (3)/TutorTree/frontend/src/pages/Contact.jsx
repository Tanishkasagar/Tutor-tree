import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {// Functional component for the Contact page
  return (
    <div>
    <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
    </div>
    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
      <img className='w-full md:max-[360px]:' src={assets.contact_image} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
        <p className='text-gray-500'>123 Oceanpearl Station <br/>Toronto,Ontario,Canada</p>
        <p className='text-gray-500'>Tel: (123) 223-4558 <br /> Email:abc@gamil.com</p>
        <p className='font-semibold text-lg text-gray-600'>Carrers at TutorTree</p>
        <p className='text-gray-500 '>Learn more about our team and job openings.</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
    </div>
    </div>
  )
}

export default Contact// Exporting the Contact component for use in other parts of the app