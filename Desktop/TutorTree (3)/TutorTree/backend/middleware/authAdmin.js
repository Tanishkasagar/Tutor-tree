import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Extract the 'atoken' from request headers
        const { atoken } = req.headers

        // Check if the token is missing
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }

        // Decode the token using the secret key
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        // Check if the decoded token does not match the expected admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }

        // Proceed to the next middleware or route handler
        next()
    } catch (error) {
        console.log(error)
        // Return an error response if token verification fails
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;
