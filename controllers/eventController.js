const pool = require('../config/db');

exports.getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM event ORDER BY event_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM event WHERE event_id=?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const { event_name, event_date, description, location } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO event (event_name, event_date, description, location) VALUES (?, ?, ?, ?)',
      [event_name, event_date, description, location]
    );
    res.status(201).json({ message: 'Event created', event_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { event_name, event_date, description, location } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE event SET event_name=?, event_date=?, description=?, location=? WHERE event_id=?',
      [event_name, event_date, description, location, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM event WHERE event_id=?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
