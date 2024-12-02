import express from 'express'; // Importing the Express framework
import { loginAdmin, enrollmentsAdmin, enrollmentCancel, addtutor, alltutors } from '../controllers/adminController.js'; // Importing functions from the admin controller
import { changeAvailablity } from '../controllers/tutorController.js'; // Importing the function to change tutor availability
import authAdmin from '../middleware/authAdmin.js'; // Importing the admin authentication middleware
import upload from '../middleware/multer.js'; // Importing file upload middleware (for handling image uploads)
// Creating a new router instance for admin routes
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-tutor", authAdmin, upload.single('image'), addtutor)
adminRouter.get("/enrollments", authAdmin, enrollmentsAdmin)
adminRouter.post("/cancel-enrollment", authAdmin, enrollmentCancel)
adminRouter.get("/all-tutors", authAdmin, alltutors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)


export default adminRouter;