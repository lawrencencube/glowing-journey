const { Pool } = require('pg');
const config = require('../config/config');

// Create a new pool instance using the connection string from config
const pool = new Pool(config.db);

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
