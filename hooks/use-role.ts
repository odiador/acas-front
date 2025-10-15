'use client';

import { useAuth } from './use-auth';
import type { UserRole } from '@/types/auth.types';

export function useRole() {
  const { user } = useAuth();

  return {
    role: user?.role ?? (null as UserRole | null),
    isStudent: user?.role === 'STUDENT',
    isTeacher: user?.role === 'TEACHER',
    isAdmin: user?.role === 'ADMIN',
  };
}
