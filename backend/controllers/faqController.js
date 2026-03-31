import pool from '../config/database.js';

// Get all FAQs
export const getAllFAQs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faqs ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get FAQs', error: error.message });
  }
};

// Create FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer, category, display_order, status } = req.body;
    const result = await pool.query(
      'INSERT INTO faqs (question, answer, category, display_order, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [question, answer, category, display_order || 0, status !== false]
    );
    res.status(201).json({ success: true, message: 'FAQ created successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create FAQ', error: error.message });
  }
};

// Update FAQ
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category, display_order, status } = req.body;
    const result = await pool.query(
      'UPDATE faqs SET question = $1, answer = $2, category = $3, display_order = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [question, answer, category, display_order, status !== false, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update FAQ', error: error.message });
  }
};

// Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM faqs WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ deleted successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete FAQ', error: error.message });
  }
};
