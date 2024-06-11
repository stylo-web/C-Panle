import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/database.js';
import categoryRoutes from './routes/categories.js';
import subcategoryRoutes from './routes/subcategoryRoutes.js'
import finishRoutes from './routes/finishRoutes.js'
import dataRoutes from "./routes/dataRoutes.js"
import products from './routes/products.js'


// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

// Connect to the database
connectDB()
    .then(() => {
        console.log('Database connection established in main application');
    })
    .catch((err) => {
        console.error('Failed to establish database connection:', err);
    });

// Use the routers
app.use('/api/categories', categoryRoutes);
app.use('/api', finishRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', dataRoutes);
app.use('/api', products);

// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, err => {
        if (err) {
            console.error('Server failed to start', err);
        } else {
            console.log(`Server is successfully running, and app is listening on port ${PORT}`);
        }
    });
}

