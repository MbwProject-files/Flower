import pool from '../config/database.js';

// Get CTA
export const getCTA = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cta WHERE status = true ORDER BY id DESC LIMIT 1');
    res.json({ success: true, data: result.rows[0] || null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get CTA', error: error.message });
  }
};

// Update CTA
export const updateCTA = async (req, res) => {
  try {
    const { title, subtitle, description, button_text, button_link, background_color, cta_type, status } = req.body;
    const background_image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const existing = await pool.query('SELECT * FROM cta LIMIT 1');
    
    let result;
    if (existing.rows.length === 0) {
      result = await pool.query(
        'INSERT INTO cta (title, subtitle, description, button_text, button_link, background_image, background_color, cta_type, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [title, subtitle, description, button_text, button_link, background_image, background_color, cta_type || 'subscription', status !== false]
      );
    } else {
      let query = 'UPDATE cta SET title = $1, subtitle = $2, description = $3, button_text = $4, button_link = $5, background_color = $6, cta_type = $7, status = $8, updated_at = CURRENT_TIMESTAMP';
      let values = [title, subtitle, description, button_text, button_link, background_color, cta_type, status !== false];
      
      if (background_image) {
        query += ', background_image = $9 WHERE id = $10 RETURNING *';
        values.push(background_image, existing.rows[0].id);
      } else {
        query += ' WHERE id = $9 RETURNING *';
        values.push(existing.rows[0].id);
      }
      
      result = await pool.query(query, values);
    }

    res.json({ success: true, message: 'CTA updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update CTA', error: error.message });
  }
};

// Get Contact Info
export const getContactInfo = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_info WHERE status = true ORDER BY id DESC LIMIT 1');
    res.json({ success: true, data: result.rows[0] || null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get contact info', error: error.message });
  }
};

// Update Contact Info
export const updateContactInfo = async (req, res) => {
  try {
    const { address, city, state, zip_code, country, phone, email, working_hours, map_embed_url, status } = req.body;

    const existing = await pool.query('SELECT * FROM contact_info LIMIT 1');
    
    let result;
    if (existing.rows.length === 0) {
      result = await pool.query(
        'INSERT INTO contact_info (address, city, state, zip_code, country, phone, email, working_hours, map_embed_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [address, city, state, zip_code, country, phone, email, working_hours, map_embed_url, status !== false]
      );
    } else {
      result = await pool.query(
        'UPDATE contact_info SET address = $1, city = $2, state = $3, zip_code = $4, country = $5, phone = $6, email = $7, working_hours = $8, map_embed_url = $9, status = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *',
        [address, city, state, zip_code, country, phone, email, working_hours, map_embed_url, status !== false, existing.rows[0].id]
      );
    }

    res.json({ success: true, message: 'Contact info updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update contact info', error: error.message });
  }
};

// Get Footer
export const getFooter = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM footer ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get footer', error: error.message });
  }
};

// Create Footer Column
export const createFooterColumn = async (req, res) => {
  try {
    const { column_title, column_type, content, display_order, status } = req.body;

    const result = await pool.query(
      'INSERT INTO footer (column_title, column_type, content, display_order, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [column_title, column_type, content, display_order || 0, status !== false]
    );
    res.status(201).json({ success: true, message: 'Footer column created successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create footer column', error: error.message });
  }
};

// Update Footer Column
export const updateFooterColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { column_title, column_type, content, display_order, status } = req.body;

    const result = await pool.query(
      'UPDATE footer SET column_title = $1, column_type = $2, content = $3, display_order = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [column_title, column_type, content, display_order, status !== false, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Footer column not found' });
    }
    res.json({ success: true, message: 'Footer column updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update footer column', error: error.message });
  }
};

// Delete Footer Column
export const deleteFooterColumn = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM footer WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Footer column not found' });
    }
    res.json({ success: true, message: 'Footer column deleted successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete footer column', error: error.message });
  }
};
