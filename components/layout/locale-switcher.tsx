'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/navigation';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

const locales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

interface LocaleSwitcherProps {
  direction?: 'down' | 'right';
  refresh?: boolean;
}

export function LocaleSwitcher({ direction = 'down', refresh = false }: LocaleSwitcherProps = {}) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    if (refresh) {
      const queryString = searchParams.toString();
      const newUrl = `/${newLocale}${pathname}${queryString ? `?${queryString}` : ''}`;
      window.location.href = newUrl;
    } else {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={direction === 'right' ? 'start' : 'end'}
        side={direction === 'right' ? 'right' : 'bottom'}
      >
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={locale === loc.code ? 'bg-accent' : ''}
          >
            {loc.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
