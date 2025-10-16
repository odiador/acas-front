'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api-client';
import type { LoginResponse } from '@/types/auth.types';
import { AxiosError } from 'axios';

// Credenciales de testing
const TEST_ACCOUNTS = {
  admin: { email: 'admin@acas.com', password: 'admin123', label: 'Admin' },
  teacher: { email: 'teacher@acas.com', password: 'teacher123', label: 'Teacher' },
  student: { email: 'student@acas.com', password: 'student123', label: 'Student' },
};

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps = {}) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (loginEmail: string, loginPassword: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.post<{ data: LoginResponse; success: boolean }>('/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });

      // El backend devuelve { success: true, data: { user, token } }
      const { user, token } = response.data.data || response.data;
      
      // Guardar token y usuario en el store (localStorage)
      login(user, token);
      
      // Configurar el token en los headers para futuras peticiones
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Pequeño delay para asegurar que el store se actualice
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Si hay un callback onSuccess (para modales), ejecutarlo
      if (onSuccess) {
        onSuccess();
      } else {
        // Si no, redirigir al dashboard
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.error?.message ||
                            err.response?.data?.message ||
                            t('invalidCredentials');
        setError(errorMessage);
      } else {
        setError(t('invalidCredentials'));
      }

    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const handleQuickLogin = async (role: keyof typeof TEST_ACCOUNTS) => {
    const account = TEST_ACCOUNTS[role];
    setEmail(account.email);
    setPassword(account.password);
    await handleLogin(account.email, account.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              {t('forgotPassword')}
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </Field>
        {error && (
          <div className="text-sm text-destructive">{error}</div>
        )}
        <Field>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('loading') : t('submit')}
          </Button>
        </Field>

        {/* Quick Login Buttons for Testing */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Quick Login (Testing)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('admin')}
            disabled={isLoading}
            className="text-xs"
          >
            Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('teacher')}
            disabled={isLoading}
            className="text-xs"
          >
            Teacher
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('student')}
            disabled={isLoading}
            className="text-xs"
          >
            Student
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
