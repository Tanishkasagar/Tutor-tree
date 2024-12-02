// Importing mongoose library to interact with MongoDB
import mongoose from "mongoose";

const connectDB = async () => {

    // Listener for 'connected' event: logs message when a successful connection is made to MongoDB
    mongoose.connection.on('connected', () => console.log("Database Connected"));

    // Establishing a connection to the MongoDB database using the connection URI from environment variables
    await mongoose.connect(`${process.env.MONGODB_URI}/tutortree`);s
}

// Exporting the connectDB function to use it elsewhere in the application for database connection
export default connectDB;
