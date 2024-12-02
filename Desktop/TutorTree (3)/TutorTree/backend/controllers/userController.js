import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import tutorModel from "../models/tutorModel.js";
import enrollmentModel from "../models/enrollmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        // Checking if mandatory fields are provided
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        // Updating user profile information
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        // If image is uploaded, update it on Cloudinary
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            // Saving image URL in user profile
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book enrollment
const bookenrollment = async (req, res) => {
    try {
        const { userId, tutId, slotDate, slotTime } = req.body
        const tutData = await tutorModel.findById(tutId).select("-password")

        // Check if tutor is available
        if (!tutData.available) {
            return res.json({ success: false, message: 'Tutor Not Available' })
        }

        let slots_booked = tutData.slots_booked

        // Checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete tutData.slots_booked

        // Creating enrollment data
        const enrollmentData = {
            userId,
            tutId,
            userData,
            tutData,
            amount: tutData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newenrollment = new enrollmentModel(enrollmentData)
        await newenrollment.save()

        // Save the updated slot data in tutor model
        await tutorModel.findByIdAndUpdate(tutId, { slots_booked })

        res.json({ success: true, message: 'Enrollment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel enrollment
const cancelenrollment = async (req, res) => {
    try {
        const { userId, enrollmentId } = req.body
        const enrollmentData = await enrollmentModel.findById(enrollmentId)

        // Verify if the user is the one who booked the enrollment
        if (enrollmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        // Mark the enrollment as cancelled
        await enrollmentModel.findByIdAndUpdate(enrollmentId, { cancelled: true })

        // Release the tutor slot
        const { tutId, slotDate, slotTime } = enrollmentData

        const tutorData = await tutorModel.findById(tutId)

        let slots_booked = tutorData.slots_booked

        // Remove the slot from the booked slots
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        // Update tutor data with the modified slot list
        await tutorModel.findByIdAndUpdate(tutId, { slots_booked })

        res.json({ success: true, message: 'Enrollment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user enrollments for frontend my-enrollments page
const listenrollment = async (req, res) => {
    try {
        const { userId } = req.body
        const enrollments = await enrollmentModel.find({ userId })

        res.json({ success: true, enrollments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of enrollment using Stripe
const paymentStripe = async (req, res) => {
    try {
        const { enrollmentId } = req.body
        const { origin } = req.headers

        const enrollmentData = await enrollmentModel.findById(enrollmentId)

        if (!enrollmentData || enrollmentData.cancelled) {
            return res.json({ success: false, message: 'Enrollment Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Enrollment Fees"
                },
                unit_amount: enrollmentData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&enrollmentId=${enrollmentData._id}`,
            cancel_url: `${origin}/verify?success=false&enrollmentId=${enrollmentData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify Stripe payment
const verifyStripe = async (req, res) => {
    try {
        const { enrollmentId, success } = req.body

        if (success === "true") {
            await enrollmentModel.findByIdAndUpdate(enrollmentId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookenrollment,
    listenrollment,
    cancelenrollment,
    paymentStripe,
    verifyStripe
}
