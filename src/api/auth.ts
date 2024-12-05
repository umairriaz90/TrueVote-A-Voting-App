import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../config';

interface User {
  email: string;
  walletAddress?: string;
}

export const authApi = {
  async getCurrentUser(): Promise<User> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No auth token found');

      const response: AxiosResponse<User> = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get current user');
    }
  }
};
