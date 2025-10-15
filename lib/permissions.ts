import type { UserRole } from '@/types/auth.types';

type Permission =
  | 'view:dashboard'
  | 'view:students'
  | 'manage:students'
  | 'view:courses'
  | 'manage:courses'
  | 'view:users'
  | 'manage:users'
  | 'view:reports'
  | 'manage:reports'
  | 'view:profile'
  | 'manage:profile';

const rolePermissions: Record<UserRole, Permission[]> = {
  STUDENT: [
    'view:dashboard',
    'view:courses',
    'view:profile',
    'manage:profile',
  ],
  TEACHER: [
    'view:dashboard',
    'view:students',
    'manage:students',
    'view:courses',
    'manage:courses',
    'view:reports',
    'view:profile',
    'manage:profile',
  ],
  ADMIN: [
    'view:dashboard',
    'view:students',
    'manage:students',
    'view:courses',
    'manage:courses',
    'view:users',
    'manage:users',
    'view:reports',
    'manage:reports',
    'view:profile',
    'manage:profile',
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

/**
 * Get all permissions for a role
 */
export function getPermissions(role: UserRole): Permission[] {
  return rolePermissions[role] ?? [];
}

/**
 * Check if a role can access a specific route
 */
export function canAccessRoute(role: UserRole, route: string): boolean {
  const routePermissions: Record<string, UserRole[]> = {
    '/dashboard': ['STUDENT', 'TEACHER', 'ADMIN'],
    '/dashboard/students': ['TEACHER', 'ADMIN'],
    '/dashboard/courses': ['STUDENT', 'TEACHER', 'ADMIN'],
    '/dashboard/users': ['ADMIN'],
    '/dashboard/profile': ['STUDENT', 'TEACHER', 'ADMIN'],
    '/dashboard/reports': ['TEACHER', 'ADMIN'],
  };

  const allowedRoles = routePermissions[route];
  return allowedRoles?.includes(role) ?? false;
}
