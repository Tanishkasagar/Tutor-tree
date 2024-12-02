import React from 'react';  // Importing the React library to build components
import { assets } from '../assets/assets';  // Importing assets (like images) from the assets folder

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-[#E8F5E9] rounded-lg px-6 md:px-10 lg:px-20 items-center">
     
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10">
        <p className="text-3xl md:text-4xl lg:text-5xl text-[#1B5E20] font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Enrollment <br /> With Trusted Tutors
        </p>  
        <div className="mt-4">
          <img src={assets.group_profiles} alt="Profiles" className="mb-2" />  
          <p className="text-[#424242] text-sm">
            Simply browse through our extensive list of trusted tutors,
            <br />
            schedule your class and learn.
          </p> 
        </div>

        <a
          href="#speciality"
          className="mt-6 flex items-center gap-2 bg-[#2E7D32] px-8 py-3 rounded-full text-white text-sm shadow-lg hover:bg-[#1B5E20] transition-all duration-300"
        >
          Enroll Now <img className="w-3" src={assets.arrow_icon} alt="Arrow" />  {/* Button to enroll now with arrow icon */}
        </a>
      </div>
      <div className="md:w-1/2">
        <img src={assets.header_img} alt="Header" className="rounded-lg shadow-lg" />  
      </div>
    </div>
  );
};

export default Header;  // Exporting the Header component
