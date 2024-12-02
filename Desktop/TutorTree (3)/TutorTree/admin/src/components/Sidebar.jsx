import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'// Imports NavLink for creating navigation links with active styling
import { TutorContext } from '../context/TutorContext'// Imports TutorContext to manage tutor-related state
import { AdminContext } from '../context/AdminContext'// Imports AdminContext to manage admin-related state

const Sidebar = () => {
  const { dToken } = useContext(TutorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-green-50 border-r shadow-lg'> {/* Sidebar container with styling */}
      {aToken && (
        <ul className='text-green-700 mt-5'> {/* Unordered list for admin links */}
          
          <NavLink
            to={'/all-enrollments'} // Link to the "All Enrollments" page
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg transition-all ${
                isActive ? 'bg-green-100 border-r-4 border-green-500 text-green-800' : 'hover:bg-green-100'
              }`
            }
          >
            <img className='min-w-5' src={assets.enrollment_icon} alt='' />
            <p className='hidden md:block'>Enrollments</p> {/* Label for the link, visible on medium+ screens */}
          </NavLink>
          <NavLink
            to={'/add-tutor'} // Link to the "Add Tutor" page
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg transition-all ${
                isActive ? 'bg-green-100 border-r-4 border-green-500 text-green-800' : 'hover:bg-green-100'
              }`
            }
          >
            <img className='min-w-5' src={assets.add_icon} alt='' />{/* Add tutor icon */}
            <p className='hidden md:block'>Add Tutor</p>
          </NavLink>
          <NavLink
            to={'/tutor-list'}// Link to the "Tutors List" page
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg transition-all ${
                isActive ? 'bg-green-100 border-r-4 border-green-500 text-green-800' : 'hover:bg-green-100'
              }`
            }
          >
            <img className='min-w-5' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Tutors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='text-green-700 mt-5'>
          
          <NavLink
            to={'/tutor-enrollments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg transition-all ${
                isActive ? 'bg-green-100 border-r-4 border-green-500 text-green-800' : 'hover:bg-green-100'
              }`
            }
          >
            <img className='min-w-5' src={assets.enrollment_icon} alt='' /> {/* Enrollment icon */}
            <p className='hidden md:block'>Enrollments</p>
          </NavLink>
          <NavLink
            to={'/tutor-profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg transition-all ${
                isActive ? 'bg-green-100 border-r-4 border-green-500 text-green-800' : 'hover:bg-green-100'
              }`
            }
          >
            <img className='min-w-5' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Profile</p>{/* Label for the link, visible on medium+ screens */}
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar// Exports the Sidebar component for use in other parts of the application
