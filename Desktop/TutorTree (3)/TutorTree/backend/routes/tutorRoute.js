import express from 'express';
import { logintutor, enrollmentstutor, enrollmentCancel, tutorList, changeAvailablity, enrollmentComplete, tutorProfile, updatetutorProfile } from '../controllers/tutorController.js';
import authtutor from '../middleware/authTutor.js';
// Creating a new router instance for tutor routes
const tutorRouter = express.Router();
//routes for login,cancellation,list,enrollments , etc.
tutorRouter.post("/login", logintutor)
tutorRouter.post("/cancel-enrollment", authtutor, enrollmentCancel)
tutorRouter.get("/enrollments", authtutor, enrollmentstutor)
tutorRouter.get("/list", tutorList)
tutorRouter.post("/change-availability", authtutor, changeAvailablity)
tutorRouter.post("/complete-enrollment", authtutor, enrollmentComplete)
tutorRouter.get("/profile", authtutor, tutorProfile)
tutorRouter.post("/update-profile", authtutor, updatetutorProfile)

export default tutorRouter;