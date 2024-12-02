import React, { useContext, useEffect, useState } from 'react'
import { TutorContext } from '../../context/TutorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const TutorProfile = () => {

    // Destructuring values and functions from TutorContext and AppContext
    const { dToken, profileData, setProfileData, getProfileData } = useContext(TutorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)  // State to toggle between edit and view mode

    // Function to update the tutor's profile
    const updateProfile = async () => {

        try {

            // Prepare data to be updated
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            // Send the update request to the backend
            const { data } = await axios.post(backendUrl + '/api/tutor/update-profile', updateData, { headers: { dToken } })

            // Display a success or error message based on the response
            if (data.success) {
                toast.success(data.message)  // Show success toast
                setIsEdit(false)  
                getProfileData()  
            } else {
                toast.error(data.message)  // Show error toast
            }

            setIsEdit(false)  // Ensure edit mode is disabled after update

        } catch (error) {
            toast.error(error.message)  // Display error if the request fails
            console.log(error)
        }

    }

    // Fetch profile data when the component mounts or when dToken changes
    useEffect(() => {
        if (dToken) {
            getProfileData()  // Get profile data
        }
    }, [dToken])

    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                {/* Display profile image */}
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

                    {/* Tutor name, degree, specialty, and experience */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    {/* Tutor's "About" section */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {/* Conditionally render textarea for editing or display text */}
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2' rows={8} value={profileData.about} />
                                    : profileData.about
                            }
                        </p>
                    </div>

                    {/* Enrollment fee input or display */}
                    <p className='text-gray-600 font-medium mt-4'>
                        Enrollment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
                    </p>

                    {/* Address section with editable fields */}
                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                    </div>

                    {/* Availability checkbox */}
                    <div className='flex gap-1 pt-2'>
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label htmlFor="">Available</label>
                    </div>

                    {/* Conditionally render "Save" or "Edit" button based on isEdit state */}
                    {
                        isEdit
                            ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default TutorProfile
