'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { useRole } from '@/hooks/use-role';
import { cn } from '@/lib/utils';
import {
  Home,
  Users,
  BookOpen,
  Settings,
  FileText,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
}

export function Sidebar() {
  const t = useTranslations('Dashboard');
  const { role } = useRole();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/dashboard',
      label: t('home'),
      icon: <Home className="h-4 w-4" />,
      roles: ['STUDENT', 'TEACHER', 'ADMIN'],
    },
    {
      href: '/dashboard/students',
      label: t('students'),
      icon: <GraduationCap className="h-4 w-4" />,
      roles: ['TEACHER', 'ADMIN'],
    },
    {
      href: '/dashboard/courses',
      label: t('courses'),
      icon: <BookOpen className="h-4 w-4" />,
      roles: ['STUDENT', 'TEACHER', 'ADMIN'],
    },
    {
      href: '/dashboard/users',
      label: t('users'),
      icon: <Users className="h-4 w-4" />,
      roles: ['ADMIN'],
    },
    {
      href: '/dashboard/reports',
      label: t('reports'),
      icon: <FileText className="h-4 w-4" />,
      roles: ['TEACHER', 'ADMIN'],
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      href: '/dashboard/profile',
      label: t('profile'),
      icon: <Settings className="h-4 w-4" />,
      roles: ['STUDENT', 'TEACHER', 'ADMIN'],
    },
  ];

  const filteredItems = role
    ? navItems.filter((item) => item.roles.includes(role))
    : [];

  const filteredBottomItems = role
    ? bottomNavItems.filter((item) => item.roles.includes(role))
    : [];

  return (
    <aside className="w-64 border-r bg-background flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight">ACAS</h2>
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <Separator />
      <div className="p-3">
        <nav className="space-y-1">
          {filteredBottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
