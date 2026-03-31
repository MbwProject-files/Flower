import pool from '../config/database.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Get total products
    const productsResult = await pool.query(
      'SELECT COUNT(*) as total FROM products WHERE status = true'
    );

    // Get total categories
    const categoriesResult = await pool.query(
      'SELECT COUNT(*) as total FROM categories WHERE status = true'
    );

    // Get total testimonials
    const testimonialsResult = await pool.query(
      'SELECT COUNT(*) as total FROM testimonials WHERE status = true'
    );

    // Get total banners
    const bannersResult = await pool.query(
      'SELECT COUNT(*) as total FROM banners WHERE status = true'
    );

    // Get total FAQs
    const faqsResult = await pool.query(
      'SELECT COUNT(*) as total FROM faqs WHERE status = true'
    );

    // Get recent products
    const recentProducts = await pool.query(
      'SELECT id, name, price, created_at FROM products ORDER BY created_at DESC LIMIT 5'
    );

    res.json({
      success: true,
      data: {
        stats: {
          totalProducts: parseInt(productsResult.rows[0].total),
          totalCategories: parseInt(categoriesResult.rows[0].total),
          totalTestimonials: parseInt(testimonialsResult.rows[0].total),
          totalBanners: parseInt(bannersResult.rows[0].total),
          totalFAQs: parseInt(faqsResult.rows[0].total)
        },
        recentProducts: recentProducts.rows,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard stats',
      error: error.message
    });
  }
};
