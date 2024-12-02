import React, { useContext, useEffect, useState } from 'react';  
import { AppContext } from '../context/AppContext';  
import { useNavigate } from 'react-router-dom';  

const RelatedTutors = ({ speciality, tutID }) => {  // Destructuring props to get speciality and tutID
    const { tutors } = useContext(AppContext); 
    const navigate = useNavigate();  
    const [relTut, setRelTuts] = useState([]);  // State to hold the filtered related tutors

    useEffect(() => {
        if (tutors.length > 0 && speciality) {  // Check if tutors data is available and speciality is provided
            const tutorData = tutors.filter((tut) => tut.speciality === speciality && tut._id !== tutID);  
            setRelTuts(tutorData);  
        }
    }, [tutors, speciality, tutID]); 

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Tutors to Enroll</h1>  {/* Section heading */}
            <p className='sm:w-2/3 text-center text-sm'>
                Simply browse through our top list of trusted tutors.
            </p>
            <div className='grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 w-full'>
                {/* Loop through the filtered tutors and display them */}
                {relTut.slice(0, 5).map((item, index) => (
                    <div
                        onClick={() =>{ navigate(`/enrollment/${item._id}`); scrollTo(0,0)}}  
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        key={index}  // Unique key for each element in list
                    >
                        <img
                            className='w-full h-80 object-cover bg-green-900' 
                            src={item.image}
                            alt={item.name}  // Alt text for image
                            onError={(e) => e.target.src = 'path/to/default-image.jpg'} 
                        />
                        <div className='p-4'>
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
            <button
                onClick={() => {
                    navigate('/tutors');  // Navigate to the tutors list page
                    scrollTo(0, 0);  // Scroll to top of the page
                }}
                className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
            >
                More
            </button>
        </div>
    );
};

export default RelatedTutors;  // Exporting the RelatedTutors component
