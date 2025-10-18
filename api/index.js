// api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Auth0 Middleware
const checkJwt = auth({
  audience: process.env.API_IDENTIFIER,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const subjectsRouter = require('./routes/subjects');
app.use('/api/subjects', subjectsRouter(checkJwt));

const studyItemsRouter = require('./routes/studyItems');
app.use('/api/studyitems', studyItemsRouter(checkJwt));

// Export the app for Vercel
module.exports = app;