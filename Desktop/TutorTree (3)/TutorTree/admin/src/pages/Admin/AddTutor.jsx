import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddTutor = () => {
    // States to store form input values
    const [tutImg, setDocImg] = useState(false)// For tutor image
    const [name, setName] = useState('')// Tutor name
    const [email, setEmail] = useState('')// Tutor email
    const [password, setPassword] = useState('') // Password
    const [experience, setExperience] = useState('1 Year')// Experience (default 1 Year)
    const [fees, setFees] = useState('')// Tutor fees
    const [about, setAbout] = useState('')// About tutor section
    const [speciality, setSpeciality] = useState('Programming')// Speciality (default: Programming)
    const [degree, setDegree] = useState('')// Tutor's degree
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
// Context to get global values
    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    // Function to handle form submission

    const onSubmitHandler = async (event) => {
        event.preventDefault()// Prevent default form behavior (page reload)

        try {
            if (!tutImg) {
                return toast.error('Image Not Selected')
            }
// Create form data to send via request
            const formData = new FormData()
            formData.append('image', tutImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

// Send a POST request to add tutor data to the server
            const { data } = await axios.post(backendUrl + '/api/admin/add-tutor', formData, { headers: { aToken } })
            // If success, clear form and show success message
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium text-green-700'>Add Tutor</p>
 {/* Form container with padding and styling */}
            <div className='b px-8 py-8border  rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-md'>
                <div className='flex items-center gap-4 mb-8 text-gray-700'>
                    <label htmlFor="tut-img">
                        <img className='w-16 h-16 bg-green-100 rounded-full border-2 border-green-400 cursor-pointer object-cover' src={tutImg ? URL.createObjectURL(tutImg) : assets.upload_area} alt="" />
                    </label>
                    {/* Hidden file input for selecting an image */}
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="tut-img" hidden />
                    <p className='text-sm'>Upload tutor <br /> picture</p>
                </div>
                {/* Two-column layout for text inputs */}
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Your Name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Tutor Email</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400' type="email" placeholder='Email' required />
                        </div>
                         {/* Password input */}
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Set Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400' type="password" placeholder='Password' required />
                        </div>
                         {/* Experience dropdown */}

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-400'>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10 Years</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400' type="number" placeholder='Tutor fees' required />
                        </div>

                    </div>
                    {/* Right column with inputs */}

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 '>
                                <option value="Programming">Programming</option>
                                <option value="Language">Language</option>
                                <option value="Math">Math</option>
                                <option value="Business">Business</option>
                                <option value="Art">Art</option>
                                <option value="Science">Science</option>
                            </select>
                        </div>
                        {/* Degree input */}

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Degree</p>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2' type="text" placeholder='Degree' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400' type="text" placeholder='Address 1' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400' type="text" placeholder='Address 2' required />
                        </div>

                    </div>

                </div>

                {/* About tutor textarea */}
                <div>
                    <p className='mt-4 mb-2'>About Tutor</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400' rows={5} placeholder='Write about tutor'></textarea>
                </div>
                {/* Submit button */}

                <button type='submit' className='bg-green-500 px-10 py-3 mt-4 text-white rounded-full hover:bg-green-600 transition-all'>Add Tutor</button>
            </div>
        </form>
    )
}

export default AddTutor
