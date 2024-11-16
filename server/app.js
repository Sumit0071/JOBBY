// app.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use( express.json() );
const CORSOPTIONS = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}
app.use( cors( CORSOPTIONS ) );
connectDB( DATABASE_URL );

app.use( '/api/users', userRoutes ); // Protect user routes
app.use( '/api/jobs', jobRoutes );   // Protect job routes

app.listen( PORT, () => console.log( `Server running at http://localhost: ${PORT}` ) );
