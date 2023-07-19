const pool = require('../db/db');

const createAvailability = async (req, res) => {
  try {
    const { tableId, date, startTime, endTime } = req.body;

    // Save the availability to the database
    const result = await pool.query(
      'INSERT INTO availability (table_id, date, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [tableId, date, startTime, endTime]
    );

    const availability = result.rows[0];

    res.json({ availability });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime } = req.body;

    // Update the availability in the database
    const result = await pool.query(
      'UPDATE availability SET date = $1, start_time = $2, end_time = $3 WHERE id = $4 RETURNING *',
      [date, startTime, endTime, id]
    );

    const availability = result.rows[0];

    res.json({ availability });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the availability from the database
    await pool.query('DELETE FROM availability WHERE id = $1', [id]);

    res.json({ message: 'Availability deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { createAvailability, updateAvailability, deleteAvailability };