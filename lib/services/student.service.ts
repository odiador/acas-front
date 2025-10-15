import { apiClient } from '../api-client';
import type { Student } from '@/types/models.types';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    students?: T[];
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

export const studentService = {
  /**
   * GET /api/students
   * Lista todos los estudiantes (TEACHER, ADMIN)
   */
  getAll: async (params?: PaginationParams & { courseId?: string }) => {
    const response = await apiClient.get<PaginatedResponse<Student>>(
      '/students',
      { params }
    );
    return response.data;
  },

  /**
   * GET /api/students/:id
   * Obtiene información detallada de un estudiante
   */
  getById: async (id: string) => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        student: Student & {
          enrolledCourses: Array<{
            id: string;
            name: string;
            enrolledAt: string;
          }>;
          grades: Array<{
            courseId: string;
            courseName: string;
            grade: number;
            date: string;
          }>;
        };
      };
    }>(`/students/${id}`);
    return response.data;
  },

  /**
   * POST /api/students
   * Crea un nuevo estudiante (TEACHER, ADMIN)
   */
  create: async (data: { name: string; email: string; password: string }) => {
    const response = await apiClient.post<{
      success: boolean;
      data: { student: Student };
      message: string;
    }>('/students', data);
    return response.data;
  },

  /**
   * PUT /api/students/:id
   * Actualiza información de un estudiante (TEACHER, ADMIN)
   */
  update: async (id: string, data: { name?: string; email?: string }) => {
    const response = await apiClient.put<{
      success: boolean;
      data: { student: Student };
      message: string;
    }>(`/students/${id}`, data);
    return response.data;
  },

  /**
   * DELETE /api/students/:id
   * Elimina un estudiante (ADMIN)
   */
  delete: async (id: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/students/${id}`);
    return response.data;
  },

  /**
   * POST /api/students/:id/enroll
   * Inscribe un estudiante en un curso (TEACHER, ADMIN)
   */
  enroll: async (id: string, courseId: string) => {
    const response = await apiClient.post<{
      success: boolean;
      data: {
        enrollment: {
          studentId: string;
          courseId: string;
          enrolledAt: string;
        };
      };
      message: string;
    }>(`/students/${id}/enroll`, { courseId });
    return response.data;
  },

  /**
   * DELETE /api/students/:id/enroll/:courseId
   * Desinscribe un estudiante de un curso (TEACHER, ADMIN)
   */
  unenroll: async (id: string, courseId: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/students/${id}/enroll/${courseId}`);
    return response.data;
  },
};
