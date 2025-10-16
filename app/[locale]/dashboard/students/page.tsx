import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function StudentsPage() {
  const t = await getTranslations('Students');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('list')}</p>
        </div>
        <Button>{t('addNew')}</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('list')}</CardTitle>
          <CardDescription>Lista de todos los estudiantes del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            {t('noStudents')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
