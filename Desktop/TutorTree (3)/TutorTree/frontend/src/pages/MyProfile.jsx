import React, { useContext, useEffect, useState } from 'react'  // Import necessary dependencies
import { AppContext } from '../context/AppContext'  
import axios from 'axios'  
import { toast } from 'react-toastify'  
import { assets } from '../assets/assets' 

const MyProfile = () => {

    // State for controlling edit mode and image upload
    const [isEdit, setIsEdit] = useState(false) 
    const [image, setImage] = useState(false)  

    // Access context values for user data, token, backend URL, and functions
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address)) 
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            // If a new image is selected, append it to the form data
            image && formData.append('image', image)

            // Make API request to update the profile data
            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            // Check if the update is successful
            if (data.success) {
                toast.success(data.message) 
                await loadUserProfileData()  
                setIsEdit(false)  
                setImage(false)  
            } else {
                toast.error(data.message)  // Show error toast if the update failed
            }

        } catch (error) {
            console.log(error)  // Log any errors
            toast.error(error.message)  // Show error toast notification
        }
    }

    return userData ? (  // Ensure userData is available before rendering the profile
        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

          
            {isEdit
                ? <label htmlFor='image' >
                    <div className='inline-block relative cursor-pointer'>
                        {/* Display image if in edit mode, or use a placeholder if no new image is selected */}
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />  
                </label>
                : <img className='w-36 rounded' src={userData.image} alt="" />  // Display user image when not in edit mode
            }
            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p> 
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none' />  {/* Separator line */}

            {/* Contact Information section */}
            <div>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p> 
                    <p className='font-medium'>Phone:</p>

    
                    {isEdit
                        ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-500'>{userData.phone}</p>  // Display phone in non-edit mode
                    }

                    <p className='font-medium'>Address:</p>

                    {/* Address input/edit section */}
                    {isEdit
                        ? <p>
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>  // Editable address fields
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>  // Display address in non-edit mode
                    }

                </div>
            </div>

            {/* Basic Information section */}
            <div>
                <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>

                    {/* Gender selection/edit section */}
                    {isEdit
                        ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userData.gender}</p>  // Display gender in non-edit mode
                    }

                    <p className='font-medium'>Birthday:</p>

                    {/* Date of birth input/edit section */}
                    {isEdit
                        ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-500'>{userData.dob}</p>  // Display birthday in non-edit mode
                    }

                </div>
            </div>

            {/* Save or Edit button */}
            <div className='mt-10'>
                {isEdit
                    ? <button onClick={updateUserProfileData} className='border border-[#064420] px-8 py-2 rounded-full hover:bg-[#064420] hover:text-white transition-all'>Save information</button>  // Save button
                    : <button onClick={() => setIsEdit(true)} className='border border-[#064420] px-8 py-2 rounded-full hover:bg-[#064420] hover:text-white transition-all'>Edit</button>  // Edit button
                }
            </div>
        </div>
    ) : null  
}

export default MyProfile  // Export the component
