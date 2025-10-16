import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ReportsPage() {
  const t = await getTranslations('Reports');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reportes Académicos</CardTitle>
            <CardDescription>Estadísticas de rendimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Próximamente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reportes de Asistencia</CardTitle>
            <CardDescription>Control de asistencia</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Próximamente</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
