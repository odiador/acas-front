import { apiClient } from '../api-client';
import type { SystemUser } from '@/types/models.types';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    users?: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export const userService = {
  /**
   * GET /api/users
   * Lista todos los usuarios (ADMIN)
   */
  getAll: async (
    params?: PaginationParams & {
      role?: string;
      status?: 'active' | 'inactive';
    }
  ) => {
    const response = await apiClient.get<PaginatedResponse<SystemUser>>(
      '/users',
      { params }
    );
    return response.data;
  },

  /**
   * GET /api/users/:id
   * Obtiene información de un usuario (ADMIN)
   */
  getById: async (id: string) => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        user: SystemUser & {
          avatar?: string;
          lastLogin?: string;
        };
      };
    }>(`/users/${id}`);
    return response.data;
  },

  /**
   * POST /api/users
   * Crea un nuevo usuario (ADMIN)
   */
  create: async (data: {
    email: string;
    password: string;
    name: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      data: { user: SystemUser };
      message: string;
    }>('/users', data);
    return response.data;
  },

  /**
   * PUT /api/users/:id
   * Actualiza información de un usuario (ADMIN)
   */
  update: async (
    id: string,
    data: {
      email?: string;
      name?: string;
      role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
      status?: 'active' | 'inactive';
    }
  ) => {
    const response = await apiClient.put<{
      success: boolean;
      data: { user: SystemUser };
      message: string;
    }>(`/users/${id}`, data);
    return response.data;
  },

  /**
   * DELETE /api/users/:id
   * Elimina un usuario (ADMIN)
   */
  delete: async (id: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/users/${id}`);
    return response.data;
  },
};
