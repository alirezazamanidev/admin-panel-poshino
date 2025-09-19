import { NuqsAdapter } from 'nuqs/adapters/next';
import HeaderLayout from '../../components/layouts/headerLayout';
import SidebarLayout from '../../components/layouts/sideBarlayout';
import { Suspense } from 'react';

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SidebarLayout />

      {/* Main Content Area */}
      <div className="lg:mr-80 transition-all duration-300">
        <HeaderLayout />
        <main className="min-h-screen">
          <Suspense>
            <NuqsAdapter>{children}</NuqsAdapter>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
