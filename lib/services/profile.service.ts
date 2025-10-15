import { apiClient } from '../api-client';
import type { User } from '@/types/auth.types';

interface Profile extends User {
  bio?: string;
  phone?: string;
  address?: string;
  enrolledCourses?: Array<{
    id: string;
    name: string;
    progress: number;
  }>;
}

export const profileService = {
  /**
   * GET /api/profile
   * Obtiene el perfil del usuario autenticado
   */
  get: async () => {
    const response = await apiClient.get<{
      success: boolean;
      data: { profile: Profile };
    }>('/profile');
    return response.data;
  },

  /**
   * PUT /api/profile
   * Actualiza el perfil del usuario autenticado
   */
  update: async (data: {
    name?: string;
    bio?: string;
    phone?: string;
    address?: string;
    avatar?: string;
  }) => {
    const response = await apiClient.put<{
      success: boolean;
      data: { profile: Profile };
      message: string;
    }>('/profile', data);
    return response.data;
  },

  /**
   * POST /api/profile/change-password
   * Cambia la contraseña del usuario autenticado
   */
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>('/profile/change-password', data);
    return response.data;
  },
};
