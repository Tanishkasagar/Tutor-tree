// Import necessary dependencies and models
import jwt from "jsonwebtoken"; 
import enrollmentModel from "../models/enrollmentModel.js";  
import tutorModel from "../models/tutorModel.js"; 
import bcrypt from "bcrypt";  
import validator from "validator";  
import { v2 as cloudinary } from "cloudinary";  
import userModel from "../models/userModel.js"; 

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body

        // Check if email and password match the admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate JWT token upon successful login
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })  // Respond with success and token
        } else {
            res.json({ success: false, message: "Invalid credentials" })  // Respond with failure message
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  // Handle errors and respond
    }
}

// API to get all enrollments list
const enrollmentsAdmin = async (req, res) => {
    try {
        // Fetch all enrollments from the database
        const enrollments = await enrollmentModel.find({})
        res.json({ success: true, enrollments })  // Respond with success and enrollment data

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  // Handle errors and respond
    }
}

// API for enrollment cancellation
const enrollmentCancel = async (req, res) => {
    try {
        // Extract the enrollment ID from the request body
        const { enrollmentId } = req.body
        await enrollmentModel.findByIdAndUpdate(enrollmentId, { cancelled: true })

        res.json({ success: true, message: 'Enrollment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  
    }
}

// API for adding tutor
const addtutor = async (req, res) => {
    try {
        // Destructure the data from request body
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file  // Uploaded image file

        // Check if any required field is missing
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })  // Respond with an error message
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" }) 
        }

        // Validate password strength (at least 8 characters)
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })  
        }

        // Hash the user's password before saving
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)  
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

     
        const tutorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),  // Parse the address (which is a stringified JSON object)
            date: Date.now()  // Store the current date
        }

        // Create a new tutor document and save it to the database
        const newtutor = new tutorModel(tutorData)
        await newtutor.save()
        res.json({ success: true, message: 'Tutor Added' })  // Respond with success message

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  // Handle errors and respond
    }
}

// API to get all tutors list for admin panel
const alltutors = async (req, res) => {
    try {
        // Fetch all tutors from the database, excluding passwords
        const tutors = await tutorModel.find({}).select('-password')
        res.json({ success: true, tutors })  // Respond with the list of tutors

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })  // Handle errors and respond
    }
}

// Exporting all the API functions for use in other parts of the application
export {
    loginAdmin,
    enrollmentsAdmin,
    enrollmentCancel,
    addtutor,
    alltutors,
}
