import axios from "axios"; // Imports axios for making HTTP requests
import { createContext, useState } from "react";// Imports createContext and useState hooks from React
import { toast } from "react-toastify";// Imports toast for showing notifications


export const AdminContext = createContext()// Creates the AdminContext for sharing state and functions globally

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL // Retrieves the backend URL from environment variables

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')// Retrieves the admin token from localStorage and initializes state

    const [enrollments, setEnrollments] = useState([])
    const [tutors, setTutors] = useState([])
    

    // Getting all tutors data from Database using API
    const getAllTutors = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-tutors', { headers: { aToken } })
            if (data.success) {
                setTutors(data.tutors) // Updates the tutors state with the fetched data
            } else {
                toast.error(data.message)// Shows an error notification if the request fails
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to change tutor availablity using API
    const changeAvailability = async (tutId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { tutId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message) // Shows a success notification
                getAllTutors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)// Logs the error in the console
            toast.error(error.message)// Shows an error notification if an exception occurs
        
        }
    }


    // Getting all Enrollment data from Database using API
    const getAllEnrollments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/enrollments', { headers: { aToken } })
            if (data.success) {
                setEnrollments(data.enrollments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel Enrollment using API
    const cancelEnrollment = async (enrollmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-enrollment', { enrollmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllEnrollments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }


// Values and functions to be provided globally within the AdminContext
    const value = {
        aToken, setAToken,
        tutors,
        getAllTutors,
        changeAvailability,
        enrollments,
        getAllEnrollments,
        cancelEnrollment
        
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider// Exports the AdminContextProvider component