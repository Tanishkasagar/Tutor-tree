import React, { useContext, useEffect, useState } from 'react'  
import { useNavigate } from 'react-router-dom'  
import { AppContext } from '../context/AppContext'  
import axios from 'axios' 
import { toast } from 'react-toastify'  
import { assets } from '../assets/assets' 

const MyEnrollments = () => {

    // Access global context values for backend URL and token
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

   
    const [enrollments, setEnrollments] = useState([])  
    const [payment, setPayment] = useState('')

    // List of months for formatting the date
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the slot date (e.g., 20_01_2000 => 20 Jan 2000)
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_') 
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]  
    }

    // Function to fetch user enrollments from the API
    const getUserEnrollments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/enrollments', { headers: { token } })  
            setEnrollments(data.enrollments.reverse()) 
        } catch (error) {
            console.log(error)  
            toast.error(error.message)  
        }
    }

    // Function to cancel an enrollment using the API
    const cancelEnrollment = async (enrollmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-enrollment', { enrollmentId }, { headers: { token } })  // Send POST request to cancel enrollment
            if (data.success) {
                toast.success(data.message)  
                getUserEnrollments()
            } else {
                toast.error(data.message) 
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const enrollmentStripe = async (enrollmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { enrollmentId }, { headers: { token } })  // Send POST request to initiate Stripe payment
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url) 
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)  
            toast.error(error.message)  
        }
    }

    // Fetch user enrollments when the component is mounted or token changes
    useEffect(() => {
        if (token) {
            getUserEnrollments()  
        }
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My enrollments</p>  {/* Section header */}
            <div className=''>
                {/* Map through the enrollments and display each one */}
                {enrollments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF]' src={item.tutData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.tutData.name}</p>
                            <p>{item.tutData.speciality}</p>  {/* Tutor specialty */}
                            <p className='text-[#464646] font-medium mt-1'>Address:</p> 
                            <p className=''>{item.tutData.address.line1}</p>
                            <p className=''>{item.tutData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>  {/* Slot date and time */}
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {/* Conditional rendering of buttons based on enrollment status */}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-[#064420] hover:text-white transition-all duration-300'>
                                    Pay Online
                                </button>
                            )}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <button onClick={() => enrollmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'>
                                    <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" />  {/* Stripe logo */}
                                </button>
                            )}
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <button className='sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]'>
                                    Paid
                                </button>
                            )}

                            {item.isCompleted && (
                                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                                    Completed
                                </button>
                            )}

                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelEnrollment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                                    Cancel enrollment
                                </button>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                                    Enrollment cancelled
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyEnrollments  // Export the component
