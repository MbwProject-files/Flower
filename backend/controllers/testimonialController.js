import pool from '../config/database.js';

// Get all testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get testimonials', error: error.message });
  }
};

// Create testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, designation, quote, rating, display_order, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      'INSERT INTO testimonials (name, designation, quote, image_url, rating, display_order, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, designation, quote, image_url, rating || 5, display_order || 0, status !== false]
    );
    res.status(201).json({ success: true, message: 'Testimonial created successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create testimonial', error: error.message });
  }
};

// Update testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, quote, rating, display_order, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = 'UPDATE testimonials SET name = $1, designation = $2, quote = $3, rating = $4, display_order = $5, status = $6, updated_at = CURRENT_TIMESTAMP';
    let values = [name, designation, quote, rating, display_order, status !== false];

    if (image_url) {
      query += ', image_url = $7 WHERE id = $8 RETURNING *';
      values.push(image_url, id);
    } else {
      query += ' WHERE id = $7 RETURNING *';
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update testimonial', error: error.message });
  }
};

// Delete testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial', error: error.message });
  }
};
