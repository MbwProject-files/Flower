import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

// Banner APIs
export const bannerAPI = {
  getAll: () => api.get('/banners'),
  getById: (id) => api.get(`/banners/${id}`),
  create: (data) => api.post('/banners', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/banners/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/banners/${id}`),
};

// Product APIs
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/products/${id}`),
};

// Category APIs
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/categories/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/categories/${id}`),
};

// FAQ APIs
export const faqAPI = {
  getAll: () => api.get('/faqs'),
  create: (data) => api.post('/faqs', data),
  update: (id, data) => api.put(`/faqs/${id}`, data),
  delete: (id) => api.delete(`/faqs/${id}`),
};

// Testimonial APIs
export const testimonialAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/testimonials/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// CMS APIs
export const cmsAPI = {
  getHeader: () => api.get('/cms/header'),
  updateHeader: (data) => api.put('/cms/header', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getWhyChooseUs: () => api.get('/cms/why-choose-us'),
  createWhyChooseUs: (data) => api.post('/cms/why-choose-us', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateWhyChooseUs: (id, data) => api.put(`/cms/why-choose-us/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteWhyChooseUs: (id) => api.delete(`/cms/why-choose-us/${id}`),
  getDiscoveries: () => api.get('/cms/discoveries'),
  createDiscovery: (data) => api.post('/cms/discoveries', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateDiscovery: (id, data) => api.put(`/cms/discoveries/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteDiscovery: (id) => api.delete(`/cms/discoveries/${id}`),
};

// Settings APIs
export const settingsAPI = {
  getCTA: () => api.get('/settings/cta'),
  updateCTA: (data) => api.put('/settings/cta', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getContact: () => api.get('/settings/contact'),
  updateContact: (data) => api.put('/settings/contact', data),
  getFooter: () => api.get('/settings/footer'),
  createFooter: (data) => api.post('/settings/footer', data),
  updateFooter: (id, data) => api.put(`/settings/footer/${id}`, data),
  deleteFooter: (id) => api.delete(`/settings/footer/${id}`),
};

export default api;
