const pool = require('../db/db');

const createBooking = async (req, res) => {
  try {
    const { tableId, date, startTime, endTime } = req.body;
    const { userId } = req.user;

    // Save the booking to the database
    const result = await pool.query(
      'INSERT INTO bookings (table_id, user_id, date, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tableId, userId, date, startTime, endTime]
    );

    const booking = result.rows[0];

    res.json({ booking });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const searchAvailableTables = async (req, res) => {
  try {
    const { date, startTime, endTime, capacity } = req.query;

    // Retrieve available tables from the database based on search criteria
    const result = await pool.query(
      'SELECT * FROM tables WHERE id NOT IN (SELECT table_id FROM bookings WHERE date = $1 AND ($2, $3) OVERLAPS (start_time, end_time)) AND capacity >= $4',
      [date, startTime, endTime, capacity]
    );

    const availableTables = result.rows;

    res.json({ availableTables });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { createBooking, searchAvailableTables };