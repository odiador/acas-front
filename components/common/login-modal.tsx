'use client';

import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '../layout/locale-switcher';
import { ThemeToggle } from '../layout/theme-toggle';

export function LoginModal() {
  const t = useTranslations('Auth');
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Cerrar el modal (volver a la ruta anterior)
    router.back();
    // El usuario ya está autenticado, el ProtectedRoute permitirá el acceso
  };

  return (
    <div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        tabIndex={-1}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          aria-hidden="true"
        />
        <div className='absolute top-0 right-0 h-full w-fit flex flex-col justify-center'>
          <div
            className="relative flex flex-col items-center justify-center bg-border"
            style={{
              clipPath: 'path("M-0 32.72Q-0 23.04 12 18.85L64 0V155.44L11.64 136.59Q0 132.4 0 122.72Z")',
              WebkitClipPath: 'path("M-0 32.72Q-0 23.04 12 18.85L64 0V155.44L11.64 136.59Q0 132.4 0 122.72Z")',
              width: '64px',
              height: '156px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="flex flex-col items-center gap-2 bg-card"
              style={{
                clipPath: 'path("M2 32.72Q2 24.32 11.64 20.72L64 2V153.44L12 134.72Q2 131.12 2 122.72Z")',
                WebkitClipPath: 'path("M2 32.72Q2 24.32 11.64 20.72L64 2V153.44L12 134.72Q2 131.12 2 122.72Z")',
                width: '64px',
                height: '156px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocaleSwitcher direction="right" refresh />
              <ThemeToggle direction="right" />
            </div>
          </div>
        </div>

        {/* Modal contenido */}
        <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-300 ease-out">
          <Card className="shadow-2xl border-2">
            <CardHeader className="space-y-1 relative">
              {/* Controls arriba a la derecha */}
              <CardTitle className="text-2xl font-bold text-center pt-2">
                {t('welcome')}
              </CardTitle>
              <CardDescription className="text-center">
                {t('subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm onSuccess={handleLoginSuccess} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
