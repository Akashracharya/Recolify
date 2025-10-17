require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import the Subject model so we can use it for seeding
const Subject = require('./models/subject.model');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  
  // --- NEW: Seeding logic starts here ---
  seedDatabase();
});

const seedDatabase = async () => {
  try {
    // Check if there are any subjects in the database already
    const count = await Subject.countDocuments();
    
    // If the database is empty (count is 0), add the default subjects
    if (count === 0) {
      console.log("No subjects found. Seeding database with default subjects...");
      
      const defaultSubjects = [
        { name: 'Mathematics', color: '#FF6B6B' },
        { name: 'Physics', color: '#4ECDC4' },
        { name: 'Chemistry', color: '#45B7D1' },
        { name: 'History', color: '#96CEB4' },
      ];
      
      await Subject.insertMany(defaultSubjects);
      console.log("Default subjects have been added.");
    } else {
      console.log("Database already contains subjects. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};
// --- Seeding logic ends here ---


// --- API Routes ---
const subjectsRouter = require('./routes/subjects');
app.use('/api/subjects', subjectsRouter);

const studyItemsRouter = require('./routes/studyItems');
app.use('/api/studyitems', studyItemsRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
