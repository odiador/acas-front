import { apiClient } from '../api-client';

interface DashboardStatistics {
  totalStudents: number;
  totalCourses: number;
  totalTeachers: number;
  activeUsers: number;
  enrollmentsThisMonth: number;
  averageGrade: number;
  topCourses: Array<{
    id: string;
    name: string;
    studentsCount: number;
  }>;
  recentActivity: Array<{
    type: string;
    studentName: string;
    courseName: string;
    timestamp: string;
  }>;
}

interface StudentReport {
  student: {
    id: string;
    name: string;
    email: string;
  };
  performance: {
    averageGrade: number;
    coursesCompleted: number;
    coursesInProgress: number;
    totalCredits: number;
    attendance: number;
  };
  grades: Array<{
    courseId: string;
    courseName: string;
    grade: number;
    date: string;
  }>;
  generatedAt: string;
}

interface CourseReport {
  course: {
    id: string;
    name: string;
    instructorName: string;
  };
  statistics: {
    totalStudents: number;
    averageGrade: number;
    passRate: number;
    attendance: number;
    completionRate: number;
  };
  studentPerformance: Array<{
    studentId: string;
    studentName: string;
    grade: number;
    attendance: number;
    status: string;
  }>;
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  generatedAt: string;
}

export const reportService = {
  /**
   * GET /api/reports/dashboard
   * Obtiene estadísticas del dashboard (TEACHER, ADMIN)
   */
  getDashboard: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await apiClient.get<{
      success: boolean;
      data: { statistics: DashboardStatistics };
    }>('/reports/dashboard', { params });
    return response.data;
  },

  /**
   * GET /api/reports/students/:id
   * Genera reporte de un estudiante (TEACHER, ADMIN)
   */
  getStudentReport: async (id: string) => {
    const response = await apiClient.get<{
      success: boolean;
      data: { report: StudentReport };
    }>(`/reports/students/${id}`);
    return response.data;
  },

  /**
   * GET /api/reports/courses/:id
   * Genera reporte de un curso (TEACHER propietario, ADMIN)
   */
  getCourseReport: async (id: string) => {
    const response = await apiClient.get<{
      success: boolean;
      data: { report: CourseReport };
    }>(`/reports/courses/${id}`);
    return response.data;
  },

  /**
   * POST /api/reports/export
   * Exporta un reporte (TEACHER, ADMIN)
   */
  export: async (data: {
    type: 'students' | 'courses' | 'users' | 'dashboard';
    format: 'pdf' | 'excel' | 'csv';
    filters?: {
      startDate?: string;
      endDate?: string;
      courseId?: string;
      studentId?: string;
    };
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      data: {
        downloadUrl: string;
        expiresAt: string;
      };
      message: string;
    }>('/reports/export', data);
    return response.data;
  },
};
