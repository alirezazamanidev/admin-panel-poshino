'use client';
import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Users,
  FolderTree,
  ShoppingCart,
  Settings,
  Menu,
  X,
  Home,
  LogOut,
  Bell,
  Search,
} from 'lucide-react';
import HeaderLayout from '../../components/layouts/headerLayout';

export default function AdminPanel() {
  return (
    <>
      {/* Main aContent */}
      <main className="p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-12 text-center hover:shadow-2xl transition-all duration-500">
          <div className="max-w-lg mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg hover:scale-105 transition-transform duration-300">
              <LayoutDashboard className="w-16 h-16 text-blue-600" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-6 bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text ">
              محتوای اصلی در حال توسعه
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg font-medium">
              این قسمت برای نمایش محتوای اصلی پنل مدیریت در نظر گرفته شده است.
              شما می‌توانید از منوی سمت راست برای دسترسی به بخش‌های مختلف
              استفاده کنید.
            </p>
            <div className="mt-8 flex justify-center space-x-4 space-x-reverse">
              <button className="px-8 py-3 bg-gradient-to-l from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                شروع کنید
              </button>
              <button className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                راهنما
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
