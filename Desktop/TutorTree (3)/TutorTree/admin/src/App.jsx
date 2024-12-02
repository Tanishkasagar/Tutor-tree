import React, { useContext } from 'react'
import { TutorContext } from './context/TutorContext';  
import { AdminContext } from './context/AdminContext';  
import { Route, Routes } from 'react-router-dom'  
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from './components/Navbar' 
import Sidebar from './components/Sidebar'  
import AllEnrollments from './pages/Admin/AllEnrollments';  
import AddTutor from './pages/Admin/AddTutor'; 
import TutorsList from './pages/Admin/TutorsList'; 
import Login from './pages/Login';  // Import Login page
import TutorEnrollments from './pages/Tutor/TutorEnrollments';  // Import Tutor page for viewing tutor enrollments
import TutorProfile from './pages/Tutor/TutorProfile';  // Import Tutor page for viewing and editing tutor profile

const App = () => {

  // Access tokens for Tutor and Admin from context
  const { dToken } = useContext(TutorContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      {/* ToastContainer to display notifications */}
      <ToastContainer />
      {/* Navbar component */}
      <Navbar />
      <div className='flex items-start'>
        {/* Sidebar component */}
        <Sidebar />
        {/* Routes for navigating different pages */}
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/all-enrollments' element={<AllEnrollments />} /> 
          <Route path='/add-tutor' element={<AddTutor />} />  {/* Route for Admin: Add a new tutor */}
          <Route path='/tutor-list' element={<TutorsList />} />  {/* Route for Admin: View tutor list */}
          <Route path='/tutor-enrollments' element={<TutorEnrollments />} /> 
          <Route path='/tutor-profile' element={<TutorProfile />} /> 
        </Routes>
      </div>
    </div>
  ) : (
    // If no token exists (neither Tutor nor Admin), show the Login page
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App
