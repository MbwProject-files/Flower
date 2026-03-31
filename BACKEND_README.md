# 🌸 Flower Shop CMS - Complete Backend System

## ✅ Project Status: COMPLETE

A full-featured CMS-based Admin Panel backend system for an eCommerce flower shop website.

## 🛠️ Tech Stack

- **Frontend**: React.js 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL 15
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer (local storage)

---

## 🔐 Admin Credentials

```
Username: admin
Password: admin123
```

---

## 🚀 Quick Start

### 1. Start PostgreSQL (if not running)
```bash
sudo pg_ctlcluster 15 main start
```

### 2. Start Backend Server
```bash
cd /app/backend
node server.js
```

Backend will run on: **http://localhost:5000**

### 3. View API Documentation
Open browser to: **http://localhost:5000/docs**

---

## 📋 Available API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile (requires auth)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Banners (Hero Sliders)
- `GET /api/banners` - Get all banners
- `GET /api/banners/:id` - Get single banner
- `POST /api/banners` - Create banner (with image upload)
- `PUT /api/banners/:id` - Update banner
- `DELETE /api/banners/:id` - Delete banner

### Products
- `GET /api/products` - Get all products (supports filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (with image upload)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (with image upload)
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### FAQs
- `GET /api/faqs` - Get all FAQs
- `POST /api/faqs` - Create FAQ
- `PUT /api/faqs/:id` - Update FAQ
- `DELETE /api/faqs/:id` - Delete FAQ

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial (with image upload)
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### CMS Sections
- `GET /api/cms/header` - Get header configuration
- `PUT /api/cms/header` - Update header (with logo upload)
- `GET /api/cms/why-choose-us` - Get all "Why Choose Us" items
- `POST /api/cms/why-choose-us` - Create item
- `PUT /api/cms/why-choose-us/:id` - Update item
- `DELETE /api/cms/why-choose-us/:id` - Delete item
- `GET /api/cms/discoveries` - Get discoveries
- `POST /api/cms/discoveries` - Create discovery
- `PUT /api/cms/discoveries/:id` - Update discovery
- `DELETE /api/cms/discoveries/:id` - Delete discovery

### Settings
- `GET /api/settings/cta` - Get CTA section
- `PUT /api/settings/cta` - Update CTA
- `GET /api/settings/contact` - Get contact info
- `PUT /api/settings/contact` - Update contact info
- `GET /api/settings/footer` - Get footer columns
- `POST /api/settings/footer` - Create footer column
- `PUT /api/settings/footer/:id` - Update footer column
- `DELETE /api/settings/footer/:id` - Delete footer column

---

## 🗄️ Database Schema

Complete PostgreSQL schema located at: `/app/database/schema.sql`

### Tables Created:
1. `admin_users` - Admin authentication
2. `banners` - Hero banners and promotional sliders
3. `header` - Site header configuration
4. `why_choose_us` - Trust markers/benefits
5. `categories` - Product categories
6. `products` - Product catalog
7. `discoveries` - Featured/curated items
8. `faqs` - Frequently asked questions
9. `testimonials` - Customer reviews
10. `cta` - Call-to-action sections
11. `contact_info` - Contact information
12. `footer` - Footer content

All tables include:
- Auto-incrementing IDs
- Timestamps (created_at, updated_at)
- Status field (active/inactive)
- Image upload support where applicable

---

## 🧪 Testing the API

### Using cURL

#### 1. Login and Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### 2. Get Dashboard Stats (with token)
```bash
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 3. Get All Banners (public)
```bash
curl http://localhost:5000/api/banners
```

#### 4. Get All Products
```bash
curl http://localhost:5000/api/products
```

### Using the Documentation Interface

1. Start the backend server
2. Open browser to: `http://localhost:5000/docs`
3. Test login to get JWT token
4. Use the token to test protected endpoints

---

## 📦 File Upload

Images are stored in `/app/backend/uploads/`

Supported formats: JPEG, JPG, PNG, GIF, WEBP
Max file size: 5MB

Uploaded files are accessible at: `http://localhost:5000/uploads/filename.jpg`

---

## 🔧 Configuration

All configuration is in `/app/backend/.env`:

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=Flower_Shop
DATABASE_URL=postgres://postgres:postgres@localhost:5432/Flower_Shop

# Server
PORT=5000

# JWT
JWT_SECRET=flower_shop_secret_key_2025_super_secure_change_in_production

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

## 📁 Project Structure

```
/app/
├── backend/
│   ├── config/
│   │   ├── database.js      # PostgreSQL connection
│   │   └── init.js          # Database initialization
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── bannerController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── faqController.js
│   │   ├── testimonialController.js
│   │   ├── cmsController.js
│   │   └── settingsController.js
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication
│   │   └── upload.js        # Multer file upload
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── banners.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── faqs.js
│   │   ├── testimonials.js
│   │   ├── cms.js
│   │   └── settings.js
│   ├── public/
│   │   └── index.html       # API Documentation
│   ├── uploads/             # User uploaded files
│   ├── server.js            # Main Express server
│   ├── package.json
│   └── .env
├── database/
│   ├── schema.sql           # Complete database schema
│   └── init-db.sh           # Database initialization script
└── frontend/                # React admin panel (existing)
```

---

## ✨ Features Implemented

✅ **Authentication System**
- JWT-based authentication
- Bcrypt password hashing
- Secure token generation
- Protected route middleware

✅ **Complete CRUD APIs**
- All 11 CMS sections implemented
- RESTful API design
- Proper error handling
- Input validation

✅ **Image Upload System**
- Multer integration
- File type validation
- Size limits (5MB)
- Local file storage

✅ **Database Management**
- Complete PostgreSQL schema
- Seed data included
- Foreign key relationships
- Indexed columns for performance

✅ **API Documentation**
- Interactive documentation page
- Live API testing interface
- Status monitoring
- Example requests

✅ **Production Ready**
- MVC architecture
- Clean code structure
- Environment variables
- Error logging
- CORS enabled

---

## 🎯 Next Steps (Frontend Integration)

To connect the existing React admin panel to this backend:

1. Create API service layer in frontend
2. Add axios or fetch for API calls
3. Implement authentication flow
4. Connect admin forms to backend endpoints
5. Add loading states and error handling
6. Implement image upload UI

---

## 🛡️ Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with 24-hour expiration
- Protected routes requiring authentication
- File upload validation
- SQL injection prevention (parameterized queries)
- CORS configuration

---

## 📊 Sample Data

The database is pre-populated with:
- 1 admin user
- 1 header configuration
- 3 "Why Choose Us" items
- 6 categories
- 3 banners
- 5 FAQs
- 3 testimonials
- 1 CTA section
- 1 contact info
- 3 footer columns

---

## 🔄 Database Reinitialization

To reset the database to initial state:

```bash
/app/database/init-db.sh
```

This will drop all tables, recreate schema, and reseed data.

---

## 📝 License

This project is provided as-is for the Flower Shop CMS system.

---

## 🆘 Troubleshooting

### Backend not starting?
```bash
# Check PostgreSQL status
sudo pg_ctlcluster 15 main status

# Restart PostgreSQL
sudo pg_ctlcluster 15 main restart

# Check backend logs
tail -f /var/log/supervisor/backend.err.log
```

### Database connection error?
```bash
# Verify database exists
PGPASSWORD=postgres psql -U postgres -l | grep Flower_Shop

# Test connection
PGPASSWORD=postgres psql -U postgres -d Flower_Shop -c "SELECT NOW();"
```

### Port already in use?
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

---

**Backend System Status**: ✅ FULLY FUNCTIONAL
**Database**: ✅ INITIALIZED WITH SEED DATA
**API Endpoints**: ✅ ALL 11 SECTIONS COMPLETE
**Authentication**: ✅ JWT + BCRYPT WORKING
**File Upload**: ✅ MULTER CONFIGURED
**Documentation**: ✅ INTERACTIVE DOCS AVAILABLE

---

Developed with ❤️ for Flower Shop CMS
