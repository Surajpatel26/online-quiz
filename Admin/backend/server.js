require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Import database connection
const questionRoutes = require('./routes/questionRoutes'); // Import question routes
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // Enable JSON parsing

// Use question and user routes prefixed with '/api'
app.use('/api', questionRoutes);
app.use('/api', userRoutes);

// Connect to PostgreSQL
connectDB(); // Ensure that your database connection function is called

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
