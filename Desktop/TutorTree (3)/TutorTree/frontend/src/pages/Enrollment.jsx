import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedTutors from '../components/RelatedTutors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Enrollment = () => {
  const { tutId } = useParams(); // Get tutId from the route params
  const { tutors, currencySymbol, backendUrl, token, getTutorsData } = useContext(AppContext); // Get tutors, currencySymbol, and other context data
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [tutInfo, setTutInfo] = useState(null); // State for selected tutor info
  const [tutSlots, setTutSlots] = useState([]); // State for tutor available slots
  const [slotIndex, setSlotIndex] = useState(0); // To track the selected day
  const [slotTime, setSlotTime] = useState(''); // To track the selected time slot

  const navigate = useNavigate();

  // Fetch tutor info from the list
  const fetchTutInfo = () => {
    const tutInfo = tutors.find((tut) => tut._id === tutId); // Find the tutor by ID
    setTutInfo(tutInfo); // Update the state
  };

  // Fetch available slots for the next 7 days
  const getAvailableSlots = async () => {
    setTutSlots([]); // Reset slots

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // Set end time to 9 PM

      // Adjust starting time if today
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Store time slots for each day in the state
      setTutSlots((prev) => [
        ...prev,
        { day: dayOfWeek[currentDate.getDay()], date: currentDate.getDate(), slots: timeSlots },
      ]);
    }
  };

  // Handle enrollment action
  const enrollInCourse = async () => {
    if (!token) {
      toast.warning('Login to enroll');
      return navigate('/login');
    }

    const date = tutSlots[slotIndex].slots[0].datetime; // Get the selected date
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year;

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/book-enrollment',
        { tutId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getTutorsData(); // Refresh the tutors list
        navigate('/my-enrollments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (tutors.length > 0) {
      fetchTutInfo();
    }
  }, [tutors, tutId]);

  useEffect(() => {
    if (tutInfo) {
      getAvailableSlots(); // Fetch available slots when tutor info is available
    }
  }, [tutInfo]);

  return tutInfo ? (
    <div>
      {/* -----------Tutor details ---------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={tutInfo.image} alt="" />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/*------- Tutor Info:name , degree and experience------ */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {tutInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div>
            <p className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              {tutInfo.degree} - {tutInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{tutInfo.experience}</button>
          </div>

          {/*-----Tutor About */}
          <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
            About <img src={assets.info_icon} alt="" />
          </p>
          <p className="text-sm text-gray-500 max-w-[700px] mt-1">{tutInfo.about}</p>

          {/* Enrollment Fees */}
          <p className="text-gray-500 font-medium mt-4">
            Enrollment fees: <span className="text-gray-600">{currencySymbol}{tutInfo.fees}</span>
          </p>
        </div>
      </div>

      {/*-----Booking Slot----- */}
      <div className="sm:ml-72 sm:pl-4 mt font-medium text-gray-700">
        <p>Enrollment Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {tutSlots.length > 0 &&
            tutSlots.map((item, index) => (
              <div
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#064420] text-white' : 'border border-gray-200'}`}
                key={index}
                onClick={() => setSlotIndex(index)}
              >
                <p>{item.day}</p>
                <p>{item.date}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {/* Render time slots of the selected day */}
          {tutSlots.length > 0 &&
            tutSlots[slotIndex].slots.map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#064420] text-white' : 'text-gray-400 border border-gray-300'}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button onClick={enrollInCourse} className="bg-[#064420] text-white text-sm font-light px-14 py-3 rounded-full my-6">
          Enroll & Learn
        </button>
      </div>

      {/*Listing related Tutors */}
      <RelatedTutors tutId={tutId} speciality={tutInfo.speciality} />
    </div>
  ) : null;
};

export default Enrollment;
