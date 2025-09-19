'use client';

import { CategoryTable } from '@/app/components/category/categoryTable';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مدیریت دسته‌بندی‌ها
          </h1>
          <p className="text-gray-600">
            مدیریت و سازماندهی دسته‌بندی‌های محصولات
          </p>
        </div>
        <Link href="/categories/create">
          <button className="inline-flex cursor-pointer items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group">
            <Plus className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" />
            ایجاد دسته‌بندی جدید
          </button>
        </Link>
      </div>
      <CategoryTable />
    </div>
  );
}
