import { createContext, useEffect, useState } from "react";  
import { toast } from "react-toastify";  
import axios from 'axios';  // Importing axios for making API requests

export const AppContext = createContext();  

const AppContextProvider = (props) => {  

    const currencySymbol = '$'; 
    const backendUrl = import.meta.env.VITE_BACKEND_URL;  // URL for the backend from environment variables

    const [tutors, setTutors] = useState([]);  
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');  
    const [userData, setUserData] = useState(false);  // State to store user data, initially set to false

    // Function to get tutors' data from the API
    const getTutorsData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/tutor/list');  // API call to get the list of tutors
            if (data.success) {  
                setTutors(data.tutors);  
            } else {
                toast.error(data.message); 
            }

        } catch (error) {
            console.log(error);  
            toast.error(error.message);  // Show error message using toast
        }

    };

    // Function to load the user's profile data using the token for authentication
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });  // API call to get user profile data using the token in headers

            if (data.success) {  // If data is fetched successfully
                setUserData(data.userData);  // Set the fetched user data into the state
            } else {
                toast.error(data.message);  
            }

        } catch (error) {
            console.log(error);  // Log error to the console if something goes wrong with the API call
            toast.error(error.message);  // Show error message using toast
        }

    };

    useEffect(() => {
        getTutorsData();  
    }, []);  

    useEffect(() => {
        if (token) {  // If a token is available (i.e., user is logged in)
            loadUserProfileData();  
        }
    }, [token]); 

    const value = {
        tutors, getTutorsData,  
        currencySymbol,  // Providing currency symbol
        backendUrl, 
        token, setToken, 
        userData, setUserData, loadUserProfileData  // Providing user data and related functions
    };

    return (
        <AppContext.Provider value={value}>  // Providing the context value to child components
            {props.children}  // Rendering the child components of AppContextProvider
        </AppContext.Provider>
    );
};

export default AppContextProvider;  // Exporting AppContextProvider for use in other parts of the app
