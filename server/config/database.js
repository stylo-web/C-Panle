import mongoose from 'mongoose';

// Load environment variables


const connectDB = () => {
    return mongoose.connect(process.env.DATABASE)
        .then(() => {
            console.log("Database connection successful");
        })
        .catch((err) => {
            console.error("Database connection error:", err);
        });
};

export default connectDB;
