import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB successfully: ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// API Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio Backend API is running' });
});

// POST /api/contact - Store contact submissions in MongoDB
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message.',
      });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const savedContact = await newContact.save();

    return res.status(201).json({
      success: true,
      message: 'Contact form submission saved successfully!',
      data: savedContact,
    });
  } catch (error) {
    console.error('Error saving contact document:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while saving contact submission.',
      error: error.message,
    });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`);
});
