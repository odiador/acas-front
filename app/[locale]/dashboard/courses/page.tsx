import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CoursesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('Courses');

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
          <CardTitle>{t('allCourses')}</CardTitle>
          <CardDescription>Lista de todos los cursos disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            {t('noCourses')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
