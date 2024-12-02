import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col md:flex-row rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 items-center justify-between shadow-md"
            style={{ backgroundColor: '#A3D4AD' }} // Soft mint green background
        >
            {/* Left Side */}
            <div className="flex flex-col items-start justify-center md:w-1/2">
                <p
                    className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold"
                    style={{ color: '#064420' }} // Dark green font
                >
                    Enroll Now
                </p>
                <p
                    className="mt-4 text-sm sm:text-lg md:text-xl"
                    style={{ color: '#064420' }} // Dark green font
                >
                    With 100+ Trusted Teachers
                </p>
                <button
                    onClick={() => {
                        navigate('/login');
                        scrollTo(0, 0);
                    }}
                    className="mt-6 px-6 py-2 bg-white text-[#064420] rounded-full hover:bg-green-100 hover:scale-105 transition-all shadow-sm"
                >
                    Create Account
                </button>
            </div>

            {/* Right Side */}
            <div className="mt-10 md:mt-0 md:w-1/2 flex justify-end">
                <img
                    className="w-full max-w-xs lg:max-w-md"
                    src={assets.enrollment_img}
                    alt="Enroll Now"
                />
            </div>
        </div>
    );
};

export default Banner;
