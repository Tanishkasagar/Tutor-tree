import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { TutorContext } from '../context/TutorContext'//Imports TutorContext for managing tutor-related state
import { AdminContext } from '../context/AdminContext'//Imports AdminContext for managing admin-related state
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(TutorContext)// Accesses tutor's token and state update function from TutorContext
  const { aToken, setAToken } = useContext(AdminContext)// Accesses admin's token and state update function from AdminContext

  const navigate = useNavigate()// Initializes the function


  const logout = () => { // Function to handle user logout
    navigate('/')
    dToken && setDToken('')// Clears the tutor's token in state if it exists
    dToken && localStorage.removeItem('dToken')// Removes the tutor's token 
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')// Removes the admin's token
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-green-50'>
      <div className='flex items-center gap-2 text-xs'>
        <img 
          onClick={() => navigate('/')}  // Navigates to home page when logo is clicked
          className='w-36 sm:w-40 cursor-pointer hover:scale-105 transition-transform duration-300' // Logo styling with hover effect
          src={assets.admin_logo} 
          alt="Logo" 
        />
        <p 
          className='border px-3 py-1 rounded-full border-green-400 text-green-600 font-semibold text-sm shadow-sm'>
          {aToken ? 'Admin' : 'Tutor'}//Displays 'Admin' if aToken is present, otherwise 'Tutor'
        </p>
      </div>
      <button 
        onClick={() => logout()} 
        className='bg-green-500 text-white text-sm px-10 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300'>
        Logout
      </button>
    </div>
  )
}

export default Navbar // Exports the Navbar component for use in other parts of the application
