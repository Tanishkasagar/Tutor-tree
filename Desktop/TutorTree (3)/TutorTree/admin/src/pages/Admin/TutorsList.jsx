import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const TutorsList = () => {
 // Destructuring values and functions from AdminContext
  const { tutors, changeAvailability , aToken , getAllTutors} = useContext(AdminContext)
// Use effect to fetch all tutors when aToken is available
  useEffect(() => {
    if (aToken) {
        getAllTutors()// Fetch all tutors from the server
    }
}, [aToken])// Run the effect only when aToken changes


  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Tutors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
         {/* Loop through the tutors array and display each tutor's information */}
        {tutors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              {/* Tutor image with hover effect */}
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                {/* Tutor specialty */}
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  {/* Text label for availability */}
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TutorsList