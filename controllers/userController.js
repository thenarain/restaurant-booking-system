const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );
    
    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from the database
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    // Retrieve user profile from the database
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };