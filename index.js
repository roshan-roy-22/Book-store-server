// Import necessary modules and files
import express from "express";  // Importing the Express framework for building web applications
import mongoose from 'mongoose'; // Importing Mongoose for MongoDB object modeling
import { PORT, mongoDBURL } from "./config.js"; // Importing PORT and mongoDBURL from the 'config.js' file
import booksRoutes from './routes/bookRoutes.js' // Importing the booksRoutes from 'bookRoutes.js'
import cors from 'cors'; // Importing Cross-Origin Resource Sharing (CORS) middleware

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Configure CORS middleware
app.use(cors({
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE"],
    allowedHeaders: ['Content-type']
}))

// Define a simple route for the root endpoint
app.get('/', (req, res) => {
    return res.status(200).send("<h1> Hello Roshan</h1>"); // Respond to the root endpoint with a message
});

// Use the 'booksRoutes' middleware for handling routes starting with '/books'
app.use('/books', booksRoutes)

// Connect to the MongoDB database
mongoose.connect(mongoDBURL)
    .then(() => {
        // Log a message when the app successfully connects to the database
        console.log(`App connected to the database `);

        // Start the Express app and listen on the specified port
        app.listen(PORT, () => {
            console.log(`App is Listening To the Port: ${PORT}`);
        });
    })
    .catch((error) => {
        // Log any errors that occur during the database connection
        console.log(error);
    });
