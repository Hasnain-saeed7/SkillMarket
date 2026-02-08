import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(err);
  }
);

// Auth
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);

// Gigs
export const getGigs = (params) => api.get('/gigs', { params });
export const getGigById = (id) => api.get(`/gigs/${id}`);
export const createGig = (data) => api.post('/gigs', data);
export const updateGig = (id, data) => api.put(`/gigs/${id}`, data);
export const deleteGig = (id) => api.delete(`/gigs/${id}`);

/** Upload image from gallery; returns { url }. Use url as image_url when creating gig. */
export const uploadGigImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/gigs/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Messages
export const sendMessage = (data) => api.post('/messages', data);
export const getMessages = (params) => api.get('/messages', { params });
