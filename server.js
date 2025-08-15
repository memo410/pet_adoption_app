const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const adopterRoutes = require('./routes/adopterRoutes');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection check
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Database connected');
    conn.release();
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
})();

// Routes
app.use('/adopters', adopterRoutes);
app.use('/pets', petRoutes);
app.use('/adoptions', adoptionRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
