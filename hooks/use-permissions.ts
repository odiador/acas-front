'use client';

import { useAuth } from './use-auth';
import { hasPermission } from '@/lib/permissions';

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

export function usePermissions() {
  const { user } = useAuth();

  const can = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  return { can };
}
