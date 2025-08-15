const pool = require('../config/db');

// GET all adopters
exports.getAdopters = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM adopter ORDER BY adopter_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single adopter
exports.getAdopterById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM adopter WHERE adopter_id=?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Adopter not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE adopter
exports.createAdopter = async (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO adopter (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, address]
    );
    res.status(201).json({ message: 'Adopter added', adopter_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE adopter
exports.updateAdopter = async (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE adopter SET first_name=?, last_name=?, email=?, phone=?, address=? WHERE adopter_id=?',
      [first_name, last_name, email, phone, address, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Adopter not found' });
    res.json({ message: 'Adopter updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE adopter
exports.deleteAdopter = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM adopter WHERE adopter_id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Adopter not found' });
    res.json({ message: 'Adopter deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
