import { apiClient } from '../api-client';
import type { Course } from '@/types/models.types';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    courses?: T[];
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

export const courseService = {
  /**
   * GET /api/courses
   * Lista todos los cursos
   */
  getAll: async (
    params?: PaginationParams & { instructorId?: string; enrolled?: boolean }
  ) => {
    const response = await apiClient.get<PaginatedResponse<Course>>('/courses', {
      params,
    });
    return response.data;
  },

  /**
   * GET /api/courses/:id
   * Obtiene información detallada de un curso
   */
  getById: async (id: string) => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        course: Course & {
          students: Array<{
            id: string;
            name: string;
            email: string;
            enrolledAt: string;
          }>;
          studentsCount: number;
          syllabus: string;
          schedule: {
            days: string[];
            time: string;
          };
        };
      };
    }>(`/courses/${id}`);
    return response.data;
  },

  /**
   * POST /api/courses
   * Crea un nuevo curso (TEACHER, ADMIN)
   */
  create: async (data: {
    name: string;
    description: string;
    instructorId?: string;
    syllabus?: string;
    schedule?: {
      days: string[];
      time: string;
    };
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      data: { course: Course };
      message: string;
    }>('/courses', data);
    return response.data;
  },

  /**
   * PUT /api/courses/:id
   * Actualiza información de un curso (TEACHER propietario, ADMIN)
   */
  update: async (
    id: string,
    data: {
      name?: string;
      description?: string;
      instructorId?: string;
      syllabus?: string;
      schedule?: {
        days: string[];
        time: string;
      };
    }
  ) => {
    const response = await apiClient.put<{
      success: boolean;
      data: { course: Course };
      message: string;
    }>(`/courses/${id}`, data);
    return response.data;
  },

  /**
   * DELETE /api/courses/:id
   * Elimina un curso (ADMIN)
   */
  delete: async (id: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/courses/${id}`);
    return response.data;
  },
};
