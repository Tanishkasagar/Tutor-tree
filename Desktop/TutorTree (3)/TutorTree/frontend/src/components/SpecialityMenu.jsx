import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {// SpecialityMenu component definition
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find by Speciality </h1>
        <p className='sm:w-1/3 text-center text-sm'>Find the perfect tutor for your needs with 'Find by Specialty' – personalized learning starts here at Tutor Tree.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'> {/* Container for scrolling list of specialities */}
          {specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={'/tutors/${item.speciality}'}>
            <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
            <p>{item.speciality}</p>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default SpecialityMenu