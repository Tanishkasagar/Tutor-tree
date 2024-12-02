import mongoose from "mongoose"

// Define the schema for the enrollment collection
const enrollmentSchema = new mongoose.Schema({
    
    userId: { type: String, required: true },
    tutId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    tutData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
})

// Create or fetch the enrollment model based on the defined schema
const enrollmentModel = mongoose.models.enrollment || mongoose.model("enrollment", enrollmentSchema)

// Export the enrollment model to use it elsewhere in the application
export default enrollmentModel;
