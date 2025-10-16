'use client';

import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

export function LoginModal() {
  const t = useTranslations('Auth');
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Cerrar el modal (volver a la ruta anterior)
    router.back();
    // El usuario ya está autenticado, el ProtectedRoute permitirá el acceso
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      tabIndex={-1}
    >
      {/* Backdrop con blur fuerte */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        aria-hidden="true"
      />
      
      {/* Modal contenido */}
      <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-300 ease-out">
        <Card className="shadow-2xl border-2">
          <CardHeader className="space-y-1 relative">
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
  );
}
