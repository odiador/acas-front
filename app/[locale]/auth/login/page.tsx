import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';


export default async function LoginPage() {
  const t = await getTranslations('Auth');

  return (
    <>
      <div className='absolute right-0 top-0 h-full w-fit flex flex-col justify-center'>

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
            <LocaleSwitcher direction="right" />
            <ThemeToggle direction="right" />
          </div>
        </div>
      </div>


      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t('welcome')}
          </CardTitle>
          <CardDescription className="text-center">
            {t('subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>

    </>
  );
}
