import multer from "multer";

// Configure the storage engine for multer
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage })

// Export the multer upload instance for use in routes
export default upload;
