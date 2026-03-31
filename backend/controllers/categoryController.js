import pool from '../config/database.js';

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY display_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get categories', error: error.message });
  }
};

// Get single category
export const getCategoryById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get category', error: error.message });
  }
};

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, item_count, display_order, icon, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO categories (name, slug, description, image_url, icon, item_count, display_order, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, slug, description, image_url, icon, item_count || 0, display_order || 0, status !== false]
    );

    res.status(201).json({ success: true, message: 'Category created successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, item_count, display_order, icon, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = 'UPDATE categories SET name = $1, slug = $2, description = $3, item_count = $4, display_order = $5, icon = $6, status = $7, updated_at = CURRENT_TIMESTAMP';
    let values = [name, slug, description, item_count, display_order, icon, status !== false];

    if (image_url) {
      query += ', image_url = $8 WHERE id = $9 RETURNING *';
      values.push(image_url, id);
    } else {
      query += ' WHERE id = $8 RETURNING *';
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, message: 'Category updated successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category', error: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
  }
};
