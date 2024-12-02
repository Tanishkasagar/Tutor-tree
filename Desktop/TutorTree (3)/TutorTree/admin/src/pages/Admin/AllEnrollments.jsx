import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllEnrollments = () => {
// Destructure values and functions from context
  const { aToken, enrollments, cancelEnrollment, getAllEnrollments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
// Use effect to get all enrollments when the admin token is available
  useEffect(() => {
    if (aToken) {
      getAllEnrollments()// Fetch all enrollments data from the server
    }
  }, [aToken])// Run the effect only when aToken changes

  return (
    <div className='w-full max-w-6xl m-5 '>
{/* Title for the enrollments page */}
      <p className='mb-3 text-lg font-medium'>All Enrollments</p>
{/* Table container with overflow and scroll */}
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Students</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Tutor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {/* Iterate through enrollments and display each one */}
        {enrollments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
             {/* Enrollment number (hidden on smaller screens) */}
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            {/* Display student's age (hidden on smaller screens) */}
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              {/* Tutor information */}
            <div className='flex items-center gap-2'>
              <img src={item.tutData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.tutData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelEnrollment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllEnrollments