import axios from 'axios';
import { AuthResponse, Post, Comment, UsersResponse } from '../types';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
console.log('[API] Using API_URL:', API_URL);
console.log('[API] Environment:', process.env.NODE_ENV);
console.log('[API] REACT_APP_API_URL from env:', process.env.REACT_APP_API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const signup = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('[API] Signup request:', { username, password });
    const response = await api.post('/auth/signup', { username, password });
    console.log('[API] Signup response:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('[API] Signup error:', err?.response || err);
    throw err;
  }
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const loginUrl = `${API_URL}/auth/login`;
    console.log('[API] Login request details:');
    console.log('  URL:', loginUrl);
    console.log('  Method: POST');
    console.log('  Body:', { username, password });
    console.log('  Headers:', { 'Content-Type': 'application/json' });
    
    const response = await api.post('/auth/login', { username, password });
    
    console.log('[API] Login response status:', response.status);
    console.log('[API] Login response data:', response.data);
    
    // Store token and user data
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      console.log('[API] ✅ Token stored in localStorage');
      console.log('[API] Token value:', response.data.token.substring(0, 20) + '...');
    }
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('[API] ✅ User data stored in localStorage:', response.data.user);
    }
    
    return response.data;
  } catch (err: any) {
    console.error('[API] ========== LOGIN FAILED ==========');
    console.error('[API] Error object:', err);
    console.error('[API] Error message:', err?.message);
    console.error('[API] Error response:', err?.response);
    
    if (err.response?.status === 401) {
      throw new Error('Invalid username or password');
    }
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    if (!err.response) {
      throw new Error('Unable to connect to server. Make sure backend is running on ' + API_URL);
    }
    throw err;
  }
};

// Post APIs
export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get('/api/posts');
  return response.data;
};

export const createPost = async (title: string, content: string): Promise<Post> => {
  const response = await api.post('/api/posts', { title, content });
  return response.data;
};

// Comment APIs
export const createComment = async (content: string, postId: number, userName?: string): Promise<Comment> => {
  const response = await api.post('/api/comments', { content, postId, userName });
  return response.data;
};

// Admin APIs
export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  const response = await api.get(`/api/users?page=${page}&limit=${limit}`);
  return response.data;
};

// TODO: Students - Add API functions for the following:
// 1. Updating a post (PUT /api/posts/:id)
// 2. Deleting a post (DELETE /api/posts/:id)
// 3. Deleting a comment (DELETE /api/comments/:id)
// 4. Getting a specific user by ID (GET /api/users/:id)
// 5. Admin: Creating a user (POST /api/users)
// 6. Admin: Updating a user (PUT /api/users/:id)
// 7. Admin: Changing user role (PATCH /api/users/:id/role)
// 8. Admin: Deleting a user (DELETE /api/users/:id)
// Ensure proper error handling and type safety
