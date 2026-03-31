import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import configuration
import { initializeDatabase, checkDatabaseConnection } from './config/init.js';

// Import routes
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import bannerRoutes from './routes/banners.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import faqRoutes from './routes/faqs.js';
import testimonialRoutes from './routes/testimonials.js';
import cmsRoutes from './routes/cms.js';
import settingsRoutes from './routes/settings.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ================================
// Middleware
// ================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve API documentation
app.use('/docs', express.static(path.join(__dirname, 'public')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ================================
// API Routes
// ================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Flower Shop CMS Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/settings', settingsRoutes);

// ================================
// Error Handling
// ================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ================================
// Database & Server Initialization
// ================================

const startServer = async () => {
  try {
    console.log('\n🚀 Starting Flower Shop CMS Backend...\n');
    
    // Skip database check for now - will connect when needed
    console.log('⚠️  Skipping database initialization (connect on demand)\n');
    
    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log('═══════════════════════════════════════════════');
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log('═══════════════════════════════════════════════\n');
      
      console.log('📋 Available API Endpoints:');
      console.log('   - POST   /api/auth/login');
      console.log('   - GET    /api/auth/profile');
      console.log('   - GET    /api/dashboard/stats');
      console.log('   - CRUD   /api/banners');
      console.log('   - CRUD   /api/products');
      console.log('   - CRUD   /api/categories');
      console.log('   - CRUD   /api/faqs');
      console.log('   - CRUD   /api/testimonials');
      console.log('   - GET/PUT /api/cms/header');
      console.log('   - CRUD   /api/cms/why-choose-us');
      console.log('   - CRUD   /api/cms/discoveries');
      console.log('   - GET/PUT /api/settings/cta');
      console.log('   - GET/PUT /api/settings/contact');
      console.log('   - CRUD   /api/settings/footer\n');
      
      console.log('🔐 Admin Credentials:');
      console.log(`   Username: ${process.env.ADMIN_USERNAME || 'admin'}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}\n`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();

export default app;
