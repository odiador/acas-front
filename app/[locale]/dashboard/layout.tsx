'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { ProtectedRoute } from '@/components/common/protected-route';

export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 bg-muted/10">
            {children}
          </main>
        </div>
        {/* Parallel route para modales interceptados */}
        {modal}
      </div>
    </ProtectedRoute>
  );
}
