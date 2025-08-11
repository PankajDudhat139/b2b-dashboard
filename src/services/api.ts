import axios from 'axios';
import { User, BuyerProfile, SellerProfile, Match } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
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

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email: string, password: string, type: 'buyer' | 'seller'): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', { email, password, type });
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
  
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  }
};

// Profile API
export const profileAPI = {
  getBuyerProfile: async (id: string): Promise<BuyerProfile> => {
    const response = await api.get(`/profiles/buyers/${id}`);
    return response.data;
  },
  
  getSellerProfile: async (id: string): Promise<SellerProfile> => {
    const response = await api.get(`/profiles/sellers/${id}`);
    return response.data;
  },
  
  updateBuyerProfile: async (id: string, profile: Partial<BuyerProfile>): Promise<BuyerProfile> => {
    const response = await api.put(`/profiles/buyers/${id}`, profile);
    return response.data;
  },
  
  updateSellerProfile: async (id: string, profile: Partial<SellerProfile>): Promise<SellerProfile> => {
    const response = await api.put(`/profiles/sellers/${id}`, profile);
    return response.data;
  }
};

// Matching API
export const matchingAPI = {
  getPotentialMatches: async (userType: 'buyer' | 'seller'): Promise<(BuyerProfile | SellerProfile)[]> => {
    const response = await api.get(`/matching/${userType}/potential`);
    return response.data;
  },
  
  createMatch: async (buyerId: string, sellerId: string): Promise<Match> => {
    const response = await api.post('/matching/create', { buyerId, sellerId });
    return response.data;
  },
  
  getMatches: async (): Promise<Match[]> => {
    const response = await api.get('/matching/my-matches');
    return response.data;
  },
  
  updateMatchStatus: async (matchId: string, status: Match['status']): Promise<Match> => {
    const response = await api.put(`/matching/${matchId}/status`, { status });
    return response.data;
  }
};

// Document API
export const documentAPI = {
  uploadDocument: async (file: File, matchId: string): Promise<{ url: string; id: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('matchId', matchId);
    
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  analyzeDocument: async (documentId: string): Promise<any> => {
    const response = await api.post(`/documents/${documentId}/analyze`);
    return response.data;
  },
  
  getDocuments: async (matchId: string): Promise<any[]> => {
    const response = await api.get(`/documents/match/${matchId}`);
    return response.data;
  }
};

export default api;
