const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/availability', availabilityRoutes);
app.use('/bookings', bookingRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});