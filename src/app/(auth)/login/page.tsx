'use client';

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Shield } from 'lucide-react';
import { LoginForm } from '@/libs/forms/auth/loginForm';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">پنل مدیریت poshino</h1>
          <p className="text-gray-600">برای ادامه وارد حساب کاربری خود شوید</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <LoginForm router={router} />
        </div>


      </div>
    </div>
  );
}