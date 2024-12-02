import jwt from 'jsonwebtoken'

// tutor authentication middleware
const authtutor = async (req, res, next) => {
    const { dtoken } = req.headers

    // Check if the token is missing
    if (!dtoken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

        req.body.tutId = token_decode.id

        // Proceed to the next middleware or route handler
        next()
    } catch (error) {
        console.log(error)
        // Return an error response if token verification fails
        res.json({ success: false, message: error.message })
    }
}

export default authtutor;
