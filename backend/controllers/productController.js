import pool from '../config/database.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { category, status, featured } = req.query;
    
    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const values = [];
    let paramCount = 1;

    if (category) {
      query += ` AND p.category_id = $${paramCount++}`;
      values.push(category);
    }

    if (status !== undefined) {
      query += ` AND p.status = $${paramCount++}`;
      values.push(status === 'true');
    }

    if (featured !== undefined) {
      query += ` AND p.is_featured = $${paramCount++}`;
      values.push(featured === 'true');
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await pool.query(query, values);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get products',
      error: error.message
    });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get product',
      error: error.message
    });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, short_description, price, sale_price, category_id, stock, sku, badge, is_featured, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO products (name, slug, description, short_description, price, sale_price, image_url, category_id, stock, sku, badge, is_featured, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [name, slug, description, short_description, price, sale_price, image_url, category_id, stock || 0, sku, badge, is_featured === 'true', status !== 'false']
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, short_description, price, sale_price, category_id, stock, sku, badge, is_featured, status } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = `UPDATE products SET name = $1, slug = $2, description = $3, short_description = $4, price = $5, sale_price = $6, category_id = $7, stock = $8, sku = $9, badge = $10, is_featured = $11, status = $12, updated_at = CURRENT_TIMESTAMP`;
    let values = [name, slug, description, short_description, price, sale_price, category_id, stock, sku, badge, is_featured === 'true', status !== 'false'];

    if (image_url) {
      query += `, image_url = $13 WHERE id = $14 RETURNING *`;
      values.push(image_url, id);
    } else {
      query += ` WHERE id = $13 RETURNING *`;
      values.push(id);
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};
