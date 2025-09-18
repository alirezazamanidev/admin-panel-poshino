'use client';
import {
  FolderTree,
  Home,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
  X,
  Package,
  LayoutDashboard,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  {
    id: 'users',
    title: 'کاربران',
    icon: Users,
    href: '/users',
  },
  {
    id: 'dashboard',
    title: 'داشبورد',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    id: 'products',
    title: 'محصولات',
    icon: Package,
    href: '/products',
  },
  {
    id: 'categories',
    title: 'دسته‌بندی‌ها',
    icon: FolderTree,
    href: '/categories',
  },

  {
    id: 'orders',
    title: 'سفارشات',
    icon: ShoppingCart,
    href: '/orders',
  },
  {
    id: 'settings',
    title: 'تنظیمات',
    icon: Settings,
    href: '/settings',
  },
];
export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 right-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out border-l border-gray-200/50
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-l from-blue-600/5 to-purple-600/5">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Home className="w-7 h-7 text-white" />
            </div>
            <div className=" mr-3">
              <h1 className="text-2xl font-black text-gray-900 bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text ">
                پوشینو
              </h1>
              <p className="text-sm text-gray-500 font-medium">پنل مدیریت</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-6 space-y-3 overflow-y-auto h-full pb-32">
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-center space-x-4 space-x-reverse p-4 text-right rounded-2xl hover:bg-gradient-to-l hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-transparent hover:border-blue-100"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 group-hover:shadow-md">
                <item.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-lg mr-3">
                {item.title}
              </span>
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 right-0 left-0 p-6 border-t border-gray-200/50 bg-gradient-to-t from-white to-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-l from-emerald-50 to-blue-50 border border-emerald-100/50 shadow-sm">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">ادمین</span>
              </div>
              <div className="flex-1 mr-3">
                <p className="text-sm font-bold text-gray-900">مدیر سیستم</p>
                <p className="text-xs text-gray-500">admin</p>
              </div>
            </div>
            <button className="p-2 rounded-xl hover:bg-red-50 transition-all duration-200 hover:scale-105 group">
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
