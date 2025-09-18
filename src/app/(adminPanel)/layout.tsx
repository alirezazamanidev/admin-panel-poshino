import HeaderLayout from "../components/layouts/headerLayout";
import SidebarLayout from "../components/layouts/sideBarlayout";


export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
            <SidebarLayout />
            <div className="flex-1">
                <HeaderLayout />
                {children}
            </div>
        </main>
    )
}