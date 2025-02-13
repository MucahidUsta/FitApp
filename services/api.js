import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/appConfig';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her istekte token ekle
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth servisleri
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  updateProfile: (data) => api.put('/users/profile', data),
};

// Workout servisleri
export const workoutAPI = {
  createWorkout: (workoutData) => api.post('/workouts', workoutData),
  getWorkouts: () => api.get('/workouts'),
  updateWorkout: (id, data) => api.put(`/workouts/${id}`, data),
  deleteWorkout: (id) => api.delete(`/workouts/${id}`),
};

// Sosyal servisler
export const socialAPI = {
  createPost: (postData) => api.post('/social/posts', postData),
  likePost: (postId) => api.post(`/social/posts/${postId}/like`),
  getPosts: () => api.get('/social/posts'),
  getLeaderboard: () => api.get('/social/leaderboard'),
};

export default api; 