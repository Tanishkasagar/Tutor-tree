import React, { useContext, useState } from 'react'; 
import { assets } from '../assets/assets';  
import { NavLink, useNavigate } from 'react-router-dom'; 
import { AppContext } from '../context/AppContext'; 

const Navbar = () => {
  const navigate = useNavigate(); 
  const [showMenu, setShowMenu] = useState(false);  // State for controlling the mobile menu visibility
  const { token, setToken, userData } = useContext(AppContext);  // Destructuring token, setToken, and userData from context

  // Logout function: removes token from localStorage, resets token in context, and navigates to login page
  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b" style={{ borderColor: '#ADADAD' }}>
      <img
        onClick={() => navigate('/')}  // Navigates to home page when the logo is clicked
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="TutorTree Logo"
      />
      <ul className="md:flex items-start gap-5 font-medium hidden">  
        <NavLink to="/" className="hover:text-[#064420]">
          <li className="py-1 text-gray-700">HOME</li>
        </NavLink>
        <NavLink to="/tutors" className="hover:text-[#064420]">
          <li className="py-1 text-gray-700">ALL TUTORS</li>
        </NavLink>
        <NavLink to="/about" className="hover:text-[#064420]">
          <li className="py-1 text-gray-700">ABOUT</li>
        </NavLink>
        <NavLink to="/contact" className="hover:text-[#064420]">
          <li className="py-1 text-gray-700">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {/* Check if user is logged in based on token and user data */}
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="User" />  
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />  
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
             
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-[#064420] cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate('/my-enrollments')} className="hover:text-[#064420] cursor-pointer">
                  My Enrollments
                </p>
                <p onClick={logout} className="hover:text-[#064420] cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // If the user is not logged in, display 'Create Account' button
          <button
            onClick={() => navigate('/login')}  // Navigate to login page on click
            className="bg-[#064420] text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-[#083924] transition-all"
          >
            Create Account
          </button>
        )}
  
        <img
          onClick={() => setShowMenu(true)}  // Set showMenu to true when clicked to open mobile menu
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

      
        <div
          className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >

          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="TutorTree Logo" />
            <img
              onClick={() => setShowMenu(false)}  // Set showMenu to false to close the menu
              src={assets.cross_icon}
              className="w-7"
              alt="Close Menu"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {/* Mobile navigation links */}
            <NavLink onClick={() => setShowMenu(false)} to="/" className="hover:text-[#064420]">
              <p className="px-4 py-2 rounded-full inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/tutors" className="hover:text-[#064420]">
              <p className="px-4 py-2 rounded-full inline-block">ALL TUTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about" className="hover:text-[#064420]">
              <p className="px-4 py-2 rounded-full inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact" className="hover:text-[#064420]">
              <p className="px-4 py-2 rounded-full inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;  // Exporting the Navbar component
