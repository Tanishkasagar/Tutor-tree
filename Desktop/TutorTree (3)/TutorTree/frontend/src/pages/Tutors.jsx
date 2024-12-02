import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Tutors = () => {
  const { speciality } = useParams(); 
  const { tutors } = useContext(AppContext); // Get tutors from context
  const [filterTut, setFilterTut] = useState([]); // State for filtered tutors
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    console.log('Speciality:', speciality); 
    console.log('Tutors:', tutors); // Check if tutors data is available

    if (tutors && tutors.length > 0) {
      // Filter tutors by speciality or show all
      if (speciality) {
        setFilterTut(tutors.filter((tutor) => tutor.speciality === speciality));
      } else {
        setFilterTut(tutors); 
      }
    }
  }, [speciality, tutors]); 

  return (
    <div>
      <p className="text-gray-600">Browse through the best tutors.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Categories */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {['Programming', 'Language', 'Math', 'Business', 'Art', 'Science'].map(
            (category) => (
              <p
                key={category}
                onClick={() =>
                  speciality === category
                    ? navigate('/tutors')
                    : navigate(`/tutors/${category}`)
                }
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                  speciality === category ? 'bg-indigo-100 text-black' : ''
                }`}
              >
                {category}
              </p>
            )
          )}
        </div>

        {/* Tutors List */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterTut.length > 0 ? (
            filterTut.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/enrollment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  className="w-full h-80 object-cover bg-green-900"
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No tutors found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutors;
