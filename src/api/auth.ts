import axios from 'axios';
import { API_BASE_URL } from '../config';

export const authApi = {
  async getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');
    
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async sendOtp(email: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, { email });
    return response.data;
  },

  async verifyOtp(email: string, otp: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
    return response.data;
  }
};
