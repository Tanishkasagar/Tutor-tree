import axios from 'axios'
import React, { useContext, useState } from 'react'
import { TutorContext } from '../context/TutorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  // State to manage the user role (Admin or Tutor)
  const [state, setState] = useState('Admin')

  // State to manage the email and password inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Context to manage tokens for Tutor and Admin
  const { setDToken } = useContext(TutorContext)
  const { setAToken } = useContext(AdminContext)

  // Form submission handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();  // Prevent the default form submission

    // If the user is logging in as an Admin
    if (state === 'Admin') {
      // Send login request for Admin
      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        // Set the Admin token and save it in local storage
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        // Show error message if login fails
        toast.error(data.message)
      }

    } else {
      // If the user is logging in as a Tutor
      const { data } = await axios.post(backendUrl + '/api/tutor/login', { email, password })
      if (data.success) {
        // Set the Tutor token and save it in local storage
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        // Show error message if login fails
        toast.error(data.message)
      }

    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white'>
        {/* Display login type (Admin/Tutor) */}
        <p className='text-2xl font-semibold m-auto text-green-500'>
          <span className='text-green-500'>{state}</span> Login
        </p>

        {/* Email input */}
        <div className='w-full'>
          <p className='text-white'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)}  // Update email state
            value={email} 
            className='border border-green-500 rounded w-full p-2 mt-1 bg-black text-white' 
            type="email" 
            required  // Ensure email input is required
          />
        </div>

        {/* Password input */}
        <div className='w-full'>
          <p className='text-white'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)}  // Update password state
            value={password} 
            className='border border-green-500 rounded w-full p-2 mt-1 bg-black text-white' 
            type="password" 
            required  // Ensure password input is required
          />
        </div>

        {/* Login button */}
        <button className='bg-green-500 text-black w-full py-2 rounded-md text-base'>
          Login
        </button>

        {/* Toggle between Admin and Tutor login */}
        {
          state === 'Admin'
            ? <p className='text-black'>Tutor Login? 
              <span onClick={() => setState('Tutor')} className='text-green-500 underline cursor-pointer'>Click here</span>
            </p>
            : <p className='text-black'>Admin Login? 
              <span onClick={() => setState('Admin')} className='text-green-500 underline cursor-pointer'>Click here</span>
            </p>
        }
      </div>
    </form>
  )
}

export default Login
