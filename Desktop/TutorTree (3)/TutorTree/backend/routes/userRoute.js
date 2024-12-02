import express from 'express';
import { loginUser, registerUser, getProfile, updateProfile, bookenrollment, listenrollment, cancelenrollment, paymentStripe, verifyStripe } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';
// Creating a new router instance for user routes
const userRouter = express.Router();
//routes for login,cancellation,list,enrollments , etc.
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
userRouter.post("/book-enrollment", authUser, bookenrollment)
userRouter.get("/enrollments", authUser, listenrollment)
userRouter.post("/cancel-enrollment", authUser, cancelenrollment)
userRouter.post("/payment-stripe", authUser, paymentStripe)
userRouter.post("/verifyStripe", authUser, verifyStripe)

export default userRouter;