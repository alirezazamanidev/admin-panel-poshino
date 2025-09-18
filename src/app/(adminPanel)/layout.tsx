import { NuqsAdapter } from "nuqs/adapters/next";
import HeaderLayout from "../components/layouts/headerLayout";
import SidebarLayout from "../components/layouts/sideBarlayout";
import { Suspense } from "react";


export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
            <SidebarLayout />
            <div className="flex-1">
                <HeaderLayout />
                <Suspense>
                <NuqsAdapter>{children}</NuqsAdapter>

                </Suspense>
            </div>
        </main>
    )
}