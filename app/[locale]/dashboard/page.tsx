'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const { user, loading, logout } = useAuth();

  if (loading) {
    // Skeleton view - réplica exacta del diseño real
    return (
      <div className="space-y-6 p-8">
        {/* Header con bienvenida y botón logout */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-64 mb-1" /> {/* Título "Bienvenido, [Nombre]!" */}
            <Skeleton className="h-5 w-72" /> {/* Subtítulo "Sistema de Gestión..." */}
          </div>
          <Skeleton className="h-10 w-20 rounded-md" /> {/* Botón Logout */}
        </div>

        {/* Card de Información de Usuario */}
        <div className="rounded-lg border p-4 bg-muted/50">
          <Skeleton className="h-6 w-48 mb-3" /> {/* "Información de Usuario" */}
          <div className="space-y-1 text-sm">
            <Skeleton className="h-4 w-64" /> {/* Email: ... */}
            <Skeleton className="h-4 w-40" /> {/* Rol: ... */}
            <Skeleton className="h-4 w-56" /> {/* ID: ... */}
          </div>
        </div>
      
        {/* Grid de Cards (Students, Courses, Users) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" /> {/* Título del card */}
                <Skeleton className="h-4 w-48" /> {/* Descripción */}
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-12 mb-1" /> {/* Número grande (0) */}
                <Skeleton className="h-3 w-32" /> {/* "Total de ..." */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-2xl font-semibold mb-2">{t('noSessionTitle')}</h1>
        <p className="text-muted-foreground mb-4">{t('noSessionMessage')}</p>
        <Button onClick={() => window.location.href = '/auth/login'}>
          {t('login')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('welcome')}, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Sistema de Gestión Educativa ACAS
          </p>
        </div>
        <Button onClick={logout} variant="outline">
          {t('logout')}
        </Button>
      </div>

      <div className="rounded-lg border p-4 bg-muted/50">
        <h2 className="text-lg font-semibold mb-2">Información de Usuario</h2>
        <div className="space-y-1 text-sm">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('students')}</CardTitle>
            <CardDescription>Gestión de estudiantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total de estudiantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('courses')}</CardTitle>
            <CardDescription>Cursos disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total de cursos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('users')}</CardTitle>
            <CardDescription>Usuarios del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total de usuarios</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
