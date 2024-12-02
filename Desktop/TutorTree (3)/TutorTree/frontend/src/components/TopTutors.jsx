import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopTutors = () => {

  const navigate = useNavigate()
  const {tutors} = useContext(AppContext) // Accessing the 'tutors' data from AppContext

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Tutors to Enroll</h1>
      <p className='sm:w-2/3 text-center text-sm'> {/* Description text */}
        Simply browse through our top list of trusted tutors.
      </p>
      <div className='grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 w-full'>
          {/* Loop through the first 10 tutors in the tutors array and display each one */}
        {tutors.slice(0, 10).map((item, index) => (
          <div  onClick={() =>{ navigate(`/enrollment/${item._id}`) ; scrollTo(0,0)}}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            key={index}  // Using index as the unique key for each card
          >
            <img
              className='w-full h-80 object-cover bg-green-900'
              src={item.image}
              alt={item.name}
            />
            <div className='p-4'> {/* Container for tutor's name and details */}
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{ navigate('/tutors'); scrollTo(0,0) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10' >
        More
      </button>
    </div>
  );
};

export default TopTutors;{/* Exporting the TopTutors component for use in other parts of the app */}
