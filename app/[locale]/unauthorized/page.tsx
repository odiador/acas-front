import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { ShieldAlert } from 'lucide-react';

export default async function UnauthorizedPage() {
  const t = await getTranslations('Errors');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{t('unauthorized')}</CardTitle>
          <CardDescription>{t('unauthorizedMessage')}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href="/dashboard">
            <Button>Volver al Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
