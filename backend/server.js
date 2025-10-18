require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { auth } = require('express-oauth2-jwt-bearer');

// Import the Subject model so we can use it for seeding
const Subject = require('./models/subject.model');

const app = express();
const port = process.env.PORT || 5000;

const checkJwt = auth({
  audience: process.env.API_IDENTIFIER, // Use variable from .env
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`, // Use variable from .env
});
// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");

});

// --- API Routes ---
const subjectsRouter = require('./routes/subjects');
app.use('/api/subjects', subjectsRouter(checkJwt)); // Pass checkJwt to the router

const studyItemsRouter = require('./routes/studyItems');
app.use('/api/studyitems', studyItemsRouter(checkJwt)); // Pass checkJwt to the router


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});