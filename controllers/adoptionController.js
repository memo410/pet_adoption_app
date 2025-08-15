const pool = require('../config/db');

// GET all adoptions
exports.getAdoptions = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM adoption ORDER BY adoption_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET adoption by ID
exports.getAdoptionById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM adoption WHERE adoption_id=?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Adoption not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE adoption
exports.createAdoption = async (req, res) => {
  const { adopter_id, pet_id, adoption_date, adoption_fee, notes } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO adoption (adopter_id, pet_id, adoption_date, adoption_fee, notes) VALUES (?, ?, ?, ?, ?)',
      [adopter_id, pet_id, adoption_date, adoption_fee, notes]
    );
    res.status(201).json({ message: 'Adoption created', adoption_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE adoption
exports.updateAdoption = async (req, res) => {
  const { adopter_id, pet_id, adoption_date, adoption_fee, notes } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE adoption SET adopter_id=?, pet_id=?, adoption_date=?, adoption_fee=?, notes=? WHERE adoption_id=?',
      [adopter_id, pet_id, adoption_date, adoption_fee, notes, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Adoption not found' });
    res.json({ message: 'Adoption updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE adoption
exports.deleteAdoption = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM adoption WHERE adoption_id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Adoption not found' });
    res.json({ message: 'Adoption deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
