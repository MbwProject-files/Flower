import pool from '../config/database.js';

// Get header
export const getHeader = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM header WHERE status = true ORDER BY id DESC LIMIT 1');
    res.json({ success: true, data: result.rows[0] || null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get header', error: error.message });
  }
};

// Update header
export const updateHeader = async (req, res) => {
  try {
    const { site_title, tagline, phone, email, social_facebook, social_instagram, social_twitter, social_pinterest, status } = req.body;
    const logo_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Check if header exists
    const existing = await pool.query('SELECT * FROM header LIMIT 1');
    
    let result;
    if (existing.rows.length === 0) {
      // Create new header
      result = await pool.query(
        'INSERT INTO header (site_title, tagline, phone, email, logo_url, social_facebook, social_instagram, social_twitter, social_pinterest, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [site_title, tagline, phone, email, logo_url || '/logo.png', social_facebook, social_instagram, social_twitter, social_pinterest, status !== false]
      );
    } else {
      // Update existing
      let query = 'UPDATE header SET site_title = $1, tagline = $2, phone = $3, email = $4, social_facebook = $5, social_instagram = $6, social_twitter = $7, social_pinterest = $8, status = $9, updated_at = CURRENT_TIMESTAMP';
      let values = [site_title, tagline, phone, email, social_facebook, social_instagram, social_twitter, social_pinterest, status !== false];
      
      if (logo_url) {
        query += ', logo_url = $10 WHERE id = $11 RETURNING *';
        values.push(logo_url, existing.rows[0].id);
      } else {
        query += ' WHERE id = $10 RETURNING *';
        values.push(existing.rows[0].id);
      }
      
      result = await pool.query(query, values);
    }

    res.json({ success: true, message: 'Header updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update header', error: error.message });
  }
};

// Get Why Choose Us items
export const getWhyChooseUs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM why_choose_us ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get items', error: error.message });
  }
};

// Create Why Choose Us item
export const createWhyChooseUs = async (req, res) => {
  try {
    const { title, description, icon, display_order, status } = req.body;
    const icon_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      'INSERT INTO why_choose_us (title, description, icon, icon_url, display_order, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, icon, icon_url, display_order || 0, status !== false]
    );
    res.status(201).json({ success: true, message: 'Item created successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create item', error: error.message });
  }
};

// Update Why Choose Us item
export const updateWhyChooseUs = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, display_order, status } = req.body;
    const icon_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = 'UPDATE why_choose_us SET title = $1, description = $2, icon = $3, display_order = $4, status = $5, updated_at = CURRENT_TIMESTAMP';
    let values = [title, description, icon, display_order, status !== false];

    if (icon_url) {
      query += ', icon_url = $6 WHERE id = $7 RETURNING *';
      values.push(icon_url, id);
    } else {
      query += ' WHERE id = $6 RETURNING *';
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, message: 'Item updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update item', error: error.message });
  }
};

// Delete Why Choose Us item
export const deleteWhyChooseUs = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM why_choose_us WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, message: 'Item deleted successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete item', error: error.message });
  }
};

// Get Discoveries
export const getDiscoveries = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM discoveries ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get discoveries', error: error.message });
  }
};

// Create Discovery
export const createDiscovery = async (req, res) => {
  try {
    const { title, description, link_url, badge, display_order, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      'INSERT INTO discoveries (title, description, image_url, link_url, badge, display_order, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, image_url, link_url, badge, display_order || 0, status !== false]
    );
    res.status(201).json({ success: true, message: 'Discovery created successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create discovery', error: error.message });
  }
};

// Update Discovery
export const updateDiscovery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link_url, badge, display_order, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = 'UPDATE discoveries SET title = $1, description = $2, link_url = $3, badge = $4, display_order = $5, status = $6, updated_at = CURRENT_TIMESTAMP';
    let values = [title, description, link_url, badge, display_order, status !== false];

    if (image_url) {
      query += ', image_url = $7 WHERE id = $8 RETURNING *';
      values.push(image_url, id);
    } else {
      query += ' WHERE id = $7 RETURNING *';
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Discovery not found' });
    }
    res.json({ success: true, message: 'Discovery updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update discovery', error: error.message });
  }
};

// Delete Discovery
export const deleteDiscovery = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM discoveries WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Discovery not found' });
    }
    res.json({ success: true, message: 'Discovery deleted successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete discovery', error: error.message });
  }
};
