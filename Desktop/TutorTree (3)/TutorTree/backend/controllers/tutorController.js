// Import necessary dependencies and models
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";  
import tutorModel from "../models/tutorModel.js";  
import enrollmentModel from "../models/enrollmentModel.js"; 

// API for tutor login
const logintutor = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body
        // Find tutor by email in the database
        const user = await tutorModel.findOne({ email })

        // Check if tutor exists
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })  
        }

        // Compare the provided password with the stored password
        const isMatch = await bcrypt.compare(password, user.password)

        // If password matches, generate JWT token
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token }) 
        } else {
            res.json({ success: false, message: "Invalid credentials" })  
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

// API to get tutor enrollments for the tutor panel
const enrollmentstutor = async (req, res) => {
    try {
       
        const { tutId } = req.body
        const enrollments = await enrollmentModel.find({ tutId })

        res.json({ success: true, enrollments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

// API to cancel an enrollment for the tutor panel
const enrollmentCancel = async (req, res) => {
    try {
        // Extract tutor ID and enrollment ID from request body
        const { tutId, enrollmentId } = req.body

        // Find the specific enrollment by ID
        const enrollmentData = await enrollmentModel.findById(enrollmentId)
        // Check if enrollment belongs to the tutor
        if (enrollmentData && enrollmentData.tutId === tutId) {
            // Update the enrollment status to cancelled
            await enrollmentModel.findByIdAndUpdate(enrollmentId, { cancelled: true })
            return res.json({ success: true, message: 'Enrollment Cancelled' })  // Respond with success
        }

        res.json({ success: false, message: 'Enrollment not found or not owned by tutor' })  // Respond with failure message

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  // Handle errors and respond
    }
}

// API to mark an enrollment as completed for the tutor panel
const enrollmentComplete = async (req, res) => {
    try {
        // Extract tutor ID and enrollment ID from request body
        const { tutId, enrollmentId } = req.body

        // Find the specific enrollment by ID
        const enrollmentData = await enrollmentModel.findById(enrollmentId)
        if (enrollmentData && enrollmentData.tutId === tutId) {
            await enrollmentModel.findByIdAndUpdate(enrollmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Enrollment Completed' })  
        }

        res.json({ success: false, message: 'Enrollment not found or not owned by tutor' }) 

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

const tutorList = async (req, res) => {
    try {
        // Fetch all tutors excluding password and email fields
        const tutors = await tutorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, tutors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

// API to change tutor availability for admin and tutor panels
const changeAvailablity = async (req, res) => {
    try {
        const { tutId } = req.body

        // Find the tutor by ID
        const tutData = await tutorModel.findById(tutId)
        await tutorModel.findByIdAndUpdate(tutId, { available: !tutData.available })
        res.json({ success: true, message: 'Availability Changed' })  

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

// API to get tutor profile for tutor panel
const tutorProfile = async (req, res) => {
    try {
        // Extract tutor ID from request body
        const { tutId } = req.body
        // Fetch the tutor's profile excluding password
        const profileData = await tutorModel.findById(tutId).select('-password')

        res.json({ success: true, profileData })  
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

// API to update tutor profile data from tutor panel
const updatetutorProfile = async (req, res) => {
    try {
        const { tutId, fees, address, available } = req.body
        await tutorModel.findByIdAndUpdate(tutId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })  
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

// Exporting all the API functions for use in other parts of the application
export {
    logintutor,
    enrollmentstutor,
    enrollmentCancel,
    tutorList,
    changeAvailablity,
    enrollmentComplete,
    tutorProfile,
    updatetutorProfile
}
