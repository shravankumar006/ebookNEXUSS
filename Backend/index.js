import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

// Initialize dotenv
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: [], // Add allowed origins here, e.g., ['http://example.com']
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

// MongoDB connection URI from environment variables
const URI = process.env.MONGO_URI || 'mongodb+srv://shravan1458119:14581119ansh@ansh.c5gxcok.mongodb.net/?retryWrites=true&w=majority&appName=ANSH';

// Connect to MongoDB
try {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

// Define routes
app.use('/book', bookRoute);
app.use('/user', userRoute);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
