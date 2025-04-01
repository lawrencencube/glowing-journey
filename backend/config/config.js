require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    expiresIn: '24h'
  },
  
  // Database configuration
  db: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  },
  
  // CORS configuration
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5000',
    optionsSuccessStatus: 200
  }
};
