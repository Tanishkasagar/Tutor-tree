import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const TutorContext = createContext()

const TutorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [enrollments, setEnrollments] = useState([])
    const [profileData, setProfileData] = useState(false)

    // Getting tutor enrollment data from Database using API
    const getEnrollments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/tutor/enrollments', { headers: { dToken } })

            if (data.success) {
                setEnrollments(data.enrollments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting tutor profile data from Database using API
    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/tutor/profile', { headers: { dToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel tutor enrollment using API
    const cancelEnrollment = async (enrollmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/tutor/cancel-enrollment', { enrollmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getEnrollments()
                
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to Mark enrollment completed using API
    const completeEnrollment = async (enrollmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/tutor/complete-enrollment', { enrollmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getEnrollments()
                
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }



    const value = {
        dToken, setDToken, backendUrl,
        enrollments,
        getEnrollments,
        cancelEnrollment,
        completeEnrollment,
        profileData, setProfileData,
        getProfileData,
    }

    return (
        <TutorContext.Provider value={value}>
            {props.children}
        </TutorContext.Provider>
    )


}

export default TutorContextProvider// Exports the TutorContextProvider component