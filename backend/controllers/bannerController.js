import pool from '../config/database.js';

// Get all banners
export const getAllBanners = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM banners ORDER BY display_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get banners error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get banners',
      error: error.message
    });
  }
};

// Get single banner
export const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM banners WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get banner error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get banner',
      error: error.message
    });
  }
};

// Create banner
export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, description, button_text, button_link, banner_type, display_order, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO banners (title, subtitle, description, image_url, button_text, button_link, banner_type, display_order, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, subtitle, description, image_url, button_text, button_link, banner_type || 'hero', display_order || 0, status !== false]
    );

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create banner error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create banner',
      error: error.message
    });
  }
};

// Update banner
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, button_text, button_link, banner_type, display_order, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = 'UPDATE banners SET title = $1, subtitle = $2, description = $3, button_text = $4, button_link = $5, banner_type = $6, display_order = $7, status = $8, updated_at = CURRENT_TIMESTAMP';
    let values = [title, subtitle, description, button_text, button_link, banner_type, display_order, status !== false];

    if (image_url) {
      query += ', image_url = $9 WHERE id = $10 RETURNING *';
      values.push(image_url, id);
    } else {
      query += ' WHERE id = $9 RETURNING *';
      values.push(id);
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      message: 'Banner updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update banner error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update banner',
      error: error.message
    });
  }
};

// Delete banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM banners WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      message: 'Banner deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Delete banner error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete banner',
      error: error.message
    });
  }
};
