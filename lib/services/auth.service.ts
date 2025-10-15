import { apiClient } from '../api-client';
import type { LoginCredentials, LoginResponse, User } from '@/types/auth.types';

export const authService = {
  /**
   * POST /api/auth/login
   * Autentica un usuario y crea una sesión
   */
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<{
      success: boolean;
      data: LoginResponse;
      message: string;
    }>('/auth/login', credentials);
    return response.data;
  },

  /**
   * POST /api/auth/logout
   * Destruye la sesión actual del usuario
   */
  logout: async () => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>('/auth/logout');
    return response.data;
  },

  /**
   * POST /api/auth/register
   * Registra un nuevo usuario (solo ADMIN)
   */
  register: async (data: {
    email: string;
    password: string;
    name: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      data: { user: User };
      message: string;
    }>('/auth/register', data);
    return response.data;
  },

  /**
   * GET /api/auth/me
   * Obtiene información del usuario autenticado
   */
  me: async () => {
    const response = await apiClient.get<{
      success: boolean;
      data: { user: User };
    }>('/auth/me');
    return response.data;
  },

  /**
   * POST /api/auth/refresh
   * Refresca el token JWT
   */
  refresh: async () => {
    const response = await apiClient.post<{
      success: boolean;
      data: { token: string };
    }>('/auth/refresh');
    return response.data;
  },
};
