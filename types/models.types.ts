import type { UserRole } from './auth.types';

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  instructorId: string;
  instructorName?: string;
  studentIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  generatedBy: string;
  generatedAt: Date;
  data: unknown;
}
