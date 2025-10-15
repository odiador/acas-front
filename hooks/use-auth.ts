'use client';

import { useAuthStore } from '@/store/auth-store';

export function useAuth() {
  const { user, token, isAuthenticated, setUser, setToken, login, logout } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    login,
    logout,
  };
}
