-- =============================================
-- Flower Shop CMS Database Schema
-- PostgreSQL 14+
-- =============================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS banners CASCADE;
DROP TABLE IF EXISTS header CASCADE;
DROP TABLE IF EXISTS why_choose_us CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS discoveries CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS cta CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS footer CASCADE;

-- =============================================
-- 1. Admin Users Table
-- =============================================
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. Banners Table (Hero Sliders)
-- =============================================
CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    image_url VARCHAR(500),
    button_text VARCHAR(100),
    button_link VARCHAR(500),
    banner_type VARCHAR(50) DEFAULT 'hero', -- hero, promo, side
    display_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. Header Table (Site Header Configuration)
-- =============================================
CREATE TABLE header (
    id SERIAL PRIMARY KEY,
    logo_url VARCHAR(500),
    site_title VARCHAR(255) NOT NULL,
    tagline VARCHAR(500),
    phone VARCHAR(50),
    email VARCHAR(255),
    social_facebook VARCHAR(500),
    social_instagram VARCHAR(500),
    social_twitter VARCHAR(500),
    social_pinterest VARCHAR(500),
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. Why Choose Us Table
-- =============================================
CREATE TABLE why_choose_us (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100), -- icon name or SVG path
    icon_url VARCHAR(500), -- optional icon image
    display_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 5. Categories Table
-- =============================================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    icon VARCHAR(100),
    item_count INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 6. Products Table
-- =============================================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    image_url VARCHAR(500),
    gallery_images TEXT[], -- array of image URLs
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    stock INTEGER DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    badge VARCHAR(50), -- Best Seller, New, Sale, etc.
    is_featured BOOLEAN DEFAULT false,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 7. Discoveries Table (Just Landed/Curated Section)
-- =============================================
CREATE TABLE discoveries (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    link_url VARCHAR(500),
    badge VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 8. FAQs Table
-- =============================================
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 9. Testimonials Table
-- =============================================
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    quote TEXT NOT NULL,
    image_url VARCHAR(500), -- customer photo or product image
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    display_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 10. CTA (Call to Action) Table
-- =============================================
CREATE TABLE cta (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    description TEXT,
    button_text VARCHAR(100),
    button_link VARCHAR(500),
    background_image VARCHAR(500),
    background_color VARCHAR(50),
    cta_type VARCHAR(50) DEFAULT 'subscription', -- subscription, newsletter, promotion
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 11. Contact Info Table
-- =============================================
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255),
    working_hours TEXT,
    map_embed_url TEXT,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 12. Footer Table
-- =============================================
CREATE TABLE footer (
    id SERIAL PRIMARY KEY,
    column_title VARCHAR(255),
    column_type VARCHAR(50), -- links, social, newsletter, about
    content TEXT, -- JSON or plain text
    display_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Indexes for Performance
-- =============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_banners_status ON banners(status);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_products_slug ON products(slug);

-- =============================================
-- Sample Seed Data
-- =============================================

-- Insert default header
INSERT INTO header (site_title, tagline, phone, email, logo_url, social_instagram, social_facebook) 
VALUES 
('Gallatin Flower Boutique', 'Where Flowers Become Art', '+1 (615) 452 0123', 'studio@gallatinflower.com', '/logo.png', 'https://instagram.com/gallatin', 'https://facebook.com/gallatin');

-- Insert Why Choose Us items
INSERT INTO why_choose_us (title, description, icon, display_order, status) VALUES
('Arrives Fresh', 'Hand-selected stems, kept in water until the final moment to ensure peak bloom longevity.', 'M5 13l4 4L19 7', 1, true),
('Same Day Delivery', 'Local delivery in local time. Order by 2pm for guaranteed delivery before the sun sets.', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', 2, true),
('Artisan Florists', 'Each bouquet is a bespoke creation, crafted with passion by our award-winning master designers.', 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', 3, true);

-- Insert Categories
INSERT INTO categories (name, slug, description, item_count, display_order, status) VALUES
('Easter', 'easter', 'Beautiful Easter flower arrangements', 9, 1, true),
('Roses', 'roses', 'Premium rose bouquets for all occasions', 10, 2, true),
('Birthday', 'birthday', 'Bright and vibrant birthday bouquets', 9, 3, true),
('Sympathy', 'sympathy', 'Thoughtful sympathy arrangements', 12, 4, true),
('Occasions', 'occasions', 'Flowers for all special occasions', 15, 5, true),
('Holidays', 'holidays', 'Seasonal holiday arrangements', 8, 6, true);

-- Insert Banners
INSERT INTO banners (title, subtitle, description, button_text, button_link, banner_type, display_order, status) VALUES
('Where Flowers Become Art', 'Luxury bouquet ateliers crafted by master florists', 'Rare stems, avant-garde design, and same-day delivery across the city.', 'Shop The Edit', '/roses', 'hero', 1, true),
('Summer Blossom Collection', '25% Off All Premium Roses', 'Limited time offer on our most exquisite arrangements', 'Shop Now', '/roses', 'promo', 2, true),
('Spring Awakening Sale', 'Fresh Seasonal Blooms', 'Celebrate the season with our curated spring collection', 'Explore', '/easter', 'hero', 3, true);

-- Insert FAQs
INSERT INTO faqs (question, answer, category, display_order, status) VALUES
('Do you offer same-day delivery?', 'Yes, for orders placed before 2:00 PM local time. We deliver throughout the greater metropolitan area using our climate-controlled courier fleet to ensure your blooms arrive in harvest-fresh condition.', 'Delivery', 1, true),
('How long will my arrangement stay fresh?', 'Most of our signature bouquets last between 7-10 days. We include a specialty Studio Bloom nutrient packet and a digital care guide with every order to help you maximize the longevity of your stems.', 'Care', 2, true),
('Are your flowers sustainably sourced?', 'Transparency is our core value. 100% of our stems are sourced from certified ethical farms that prioritize biodiversity and soil health. Plus, our packaging is entirely compostable and plastic-free.', 'Sourcing', 3, true),
('Can I request a custom color palette?', 'Absolutely. Our master florists specialize in bespoke architecture. You can select Custom Edit at checkout or contact our studio directly to discuss a one-of-a-kind palette for your event.', 'Customization', 4, true),
('What is your substitution policy?', 'Since we work with seasonal nature, occasionally a specific stem may be unavailable. In these rare cases, our lead florists will substitute with a bloom of equal or greater value that maintains the specific aesthetic integrity of your chosen design.', 'Policy', 5, true);

-- Insert Testimonials
INSERT INTO testimonials (name, designation, quote, rating, display_order, status) VALUES
('Eleanor Vance', 'Verified Collector · London Studio', 'The Midnight Rose Symphony arrived in such a pristine state. It felt like a piece of art rather than just a bouquet. Simply breathtaking.', 5, 1, true),
('Julian Barnes', 'Floral Subscriber · Surrey Annex', 'I have been a subscriber for six months now. Every Friday feels like a celebration. The seasonal variety is absolutely unmatched.', 5, 2, true),
('Sophia Thorne', 'Bridal Client · Chelsea Boutique', 'Our wedding flowers were the talk of the evening. The team attention to detail and color palette was beyond my expectations.', 5, 3, true);

-- Insert CTA
INSERT INTO cta (title, subtitle, description, button_text, button_link, cta_type, status) VALUES
('Always bloom with our floral membership', 'Seasonal Subscription', 'Save up to 25% and receive a fresh bundle of joy every week. Pause or cancel anytime.', 'Join Now', '/subscription', 'subscription', true);

-- Insert Contact Info
INSERT INTO contact_info (address, city, state, zip_code, country, phone, email, working_hours, status) VALUES
('42 Main Street', 'Gallatin', 'TN', '37066', 'USA', '+1 (615) 452 0123', 'studio@gallatinflower.com', 'Mon-Fri: 8:30 AM - 4:30 PM, Sat: 8:00 AM - 12:00 PM, Sun: Closed', true);

-- Insert Footer columns
INSERT INTO footer (column_title, column_type, content, display_order, status) VALUES
('About Us', 'about', 'Gallatin Flower Boutique is your premier destination for luxury floral arrangements. We specialize in bespoke bouquets crafted by award-winning master florists.', 1, true),
('Quick Links', 'links', '{"links": [{"text": "Shop All", "url": "/roses"}, {"text": "About", "url": "/about"}, {"text": "Contact", "url": "/contact"}, {"text": "FAQ", "url": "#faq"}]}', 2, true),
('Customer Service', 'links', '{"links": [{"text": "Delivery Info", "url": "/delivery"}, {"text": "Returns", "url": "/returns"}, {"text": "Track Order", "url": "/track"}, {"text": "Privacy Policy", "url": "/privacy"}]}', 3, true);

-- =============================================
-- END OF SCHEMA
-- =============================================
