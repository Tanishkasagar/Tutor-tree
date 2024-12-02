import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
    // Extract the 'token' from request headers
    const { token } = req.headers

    // Check if the token is missing
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        // Attach the user ID to the request body for further use
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        // Return an error response if token verification fails
        res.json({ success: false, message: error.message })
    }
}

export default authUser;
