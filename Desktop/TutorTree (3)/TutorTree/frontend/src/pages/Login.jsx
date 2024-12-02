import React, { useContext, useEffect, useState } from 'react' 
import { AppContext } from '../context/AppContext' 
import axios from 'axios'  
import { toast } from 'react-toastify' 
import { useNavigate } from 'react-router-dom'

const Login = () => {

  // State variables for managing form inputs and signup/login toggle
  const [state, setState] = useState('Sign Up')  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')  

  const navigate = useNavigate() 
  const { backendUrl, token, setToken } = useContext(AppContext)  // Access global context values for backend URL and token

  // Handles form submission for both Sign Up and Login
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Handling Sign Up case
    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })  

      if (data.success) {
        localStorage.setItem('token', data.token)  // Store token in localStorage
        setToken(data.token) 
      } else {
        toast.error(data.message)  
      }

    } else {  // Handling Login case
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })  // API call for login

      if (data.success) {
        localStorage.setItem('token', data.token) 
        setToken(data.token)  
      } else {
        toast.error(data.message)  
      }
    }
  }

  // Redirect the user to the homepage if already logged in
  useEffect(() => {
    if (token) {
      navigate('/')  // Redirect to homepage if there's a token
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>  {/* Conditional heading based on state */}
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>  {/* Informative text based on state */}
        
        {/* Conditionally render 'Full Name' input for Sign Up */}
        {state === 'Sign Up'
          ? <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          : null
        }
        
        {/* Render email input */}
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        
        {/* Render password input */}
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        
        {/* Submit button with conditional text */}
        <button className='bg-[#064420] text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>
        
        {/* Toggle between Sign Up and Login */}
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-[#064420] underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-[#064420] underline cursor-pointer'>Click here</span></p>
        }
        
        {/* Google sign-in button */}
        <button className='login-with-google-btn'>Sign in with Google</button>
      </div>
    </form>
  )
}

export default Login  // Exporting Login component
