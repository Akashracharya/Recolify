    require('dotenv').config(); // Load environment variables from .env file
    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');

    const app = express();
    const port = process.env.PORT || 5000;

    // Middleware
    app.use(cors()); // Enable Cross-Origin Resource Sharing
    app.use(express.json()); // Allow server to accept and parse JSON in requests

    // Connect to MongoDB
    const uri = process.env.MONGO_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    });

    // --- API Routes will go here ---
    const subjectsRouter = require('./routes/subjects');
    app.use('/api/subjects', subjectsRouter);
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
    
