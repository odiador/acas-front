'use client';

import { useAuthStore } from '@/store/auth-store';
import { useRouter } from '@/navigation';


export function useAuth() {
  const { user, token, isAuthenticated, setUser, setToken, login: storeLogin, logout: storeLogout, _hasHydrated } = useAuthStore();
  const router = useRouter();

  const login = (user: any, token: string) => {
    storeLogin(user, token);
  };

  const logout = () => {
    storeLogout();
    router.refresh();
  };

  // loading: true mientras Zustand no ha hidratado
  const loading = !_hasHydrated;

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    login,
    logout,
    loading,
  };
}
