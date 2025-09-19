'use client';

import { useState } from 'react';
import { ArrowRight, FolderPlus, Upload, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CreateCategoryForm from '@/libs/forms/category/createCategoryForm';
import { useRouter } from 'next/navigation';

export default function CreateCategoryPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
   
          
            <div className="flex  items-center space-x-3 space-x-reverse mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl mr-3 font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                ایجاد دسته‌بندی جدید
              </h1>
            </div>
  
          
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-8 sm:p-10 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          <CreateCategoryForm router={router} />
        </div>
      </div>
    </div>
  );
}
