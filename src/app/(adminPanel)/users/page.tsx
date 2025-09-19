'use client';
import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import UserTable from '@/components/user/userTable';

// نمونه داده‌های کاربران

export default function UsersPage() {
  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-black text-gray-900 bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text">
                مدیریت کاربران
              </h1>
              <p className="text-sm sm:text-base text-gray-600 font-medium mt-1">
                مشاهده و مدیریت اطلاعات کاربران سیستم
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table - Desktop */}
      <UserTable />
    </div>
  );
}
