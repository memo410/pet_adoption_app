const pool = require('../config/db');

// GET all pets
exports.getPets = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pet ORDER BY pet_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single pet
exports.getPetById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pet WHERE pet_id=?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Pet not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE pet
exports.createPet = async (req, res) => {
  const { name, species, breed, age, gender, health_status, adoption_status, event_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO pet (name, species, breed, age, gender, health_status, adoption_status, event_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, species, breed, age, gender, health_status, adoption_status, event_id]
    );
    res.status(201).json({ message: 'Pet created', pet_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE pet
exports.updatePet = async (req, res) => {
  const { name, species, breed, age, gender, health_status, adoption_status, event_id } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE pet SET name=?, species=?, breed=?, age=?, gender=?, health_status=?, adoption_status=?, event_id=? WHERE pet_id=?',
      [name, species, breed, age, gender, health_status, adoption_status, event_id, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE pet
exports.deletePet = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM pet WHERE pet_id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
