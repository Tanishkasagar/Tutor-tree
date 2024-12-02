import React from 'react';  // Importing React for building the component
import { assets } from '../assets/assets';  // Importing assets (e.g., images) from the assets folder

const About = () => {  // Functional component for the About page
  return (
    <div>
      {/* About section title */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-[#064420] font-medium">US</span>  {/* Displaying the About title with custom styling */}
        </p>
      </div>

      {/* About content - Flex container with image and text */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        {/* About image - responsive width */}
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="About TutorTree" />  {/* Image for the About section */}
        
        {/* Text content for the About section */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          {/* Description of Tutor Tree */}
          <p>
            At Tutor Tree, we believe that every student deserves the opportunity to thrive academically with the help of the right tutor. Our mission is to connect students with expert tutors who are passionate about making learning engaging, accessible, and effective. Whether you're looking to improve your grades, prepare for an exam, or learn something new, we provide a personalized tutoring experience that caters to the individual needs and learning styles of each student. Our diverse pool of highly qualified tutors ensures that every learner can find the support they need, from K-12 to college-level courses and beyond.
          </p>
          
          <p>
            We understand that education is more than just textbooks and lectures; it's about building confidence, fostering curiosity, and developing critical thinking skills. That's why at Tutor Tree, we go beyond traditional tutoring. We offer flexible learning options, whether it's one-on-one sessions, group lessons, or online courses, allowing students to learn at their own pace and from the comfort of their own homes. Our tutors are not only experts in their fields but also passionate educators who are dedicated to guiding students through challenges and celebrating their successes.
          </p>
          <p>
            As a community-driven platform, we value collaboration, growth, and the power of learning together. Whether you're a student looking for a tutor or a tutor hoping to share your expertise, Tutor Tree provides a supportive and inspiring environment. Join us today and discover how the right tutor can make all the difference in your academic journey. Together, we can grow, learn, and achieve success—one lesson at a time.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-[#064420] font-semibold">CHOOSE US</span>  {/* Section title with custom styling */}
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-[#064420] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Expert Tutors</b>  
          <p>Our tutors are highly qualified professionals with a proven track record in their fields, ensuring top-notch education tailored to your needs.</p>  {/* Description of the expert tutors */}
        </div>

        {/* Flexible Learning section */}
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-[#064420] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Flexible Learning</b>  {/* Heading for Flexible Learning */}
          <p>Options Whether you prefer in-person, online, or group sessions, we offer various learning formats that fit into your schedule and learning preferences.</p>  {/* Description of flexible learning options */}
        </div>

        {/* Personalized Approach section */}
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-[#064420] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalized Approach</b>  {/* Heading for Personalized Approach */}
          <p>We understand that every student is unique; that's why we create customized lesson plans that cater to individual learning styles and goals.</p>  {/* Description of personalized approach */}
        </div>
      </div>
    </div>
  );
};

export default About;  // Exporting the About component for use in other parts of the app
