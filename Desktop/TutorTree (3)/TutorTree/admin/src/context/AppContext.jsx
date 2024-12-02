import { createContext } from "react";// Imports createContext to create a global context



export const AppContext = createContext()// Creates the AppContext for sharing state and functions globally

const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY// Retrieves the currency symbol from environment variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL// Retrieves the backend URL from environment variables

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]// Array for month names used for formatting dates


    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Function to calculate the age eg. ( 20_01_2000 => 24 )
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)// Converts the string date of birth to a Date object
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }
 // Values and functions to be provided globally within the AppContext
    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider