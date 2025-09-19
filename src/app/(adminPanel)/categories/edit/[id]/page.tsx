'use client';

import { redirect, useParams, useRouter, useSearchParams } from 'next/navigation';
import { useFeacher } from '@/libs/hooks/useFeacher';
import { Category } from '@/libs/models/category';
import EditCategoryForm from '@/libs/forms/category/editCategoryForm';
import { Sparkles } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import NotFound from './not-found';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const {
    data: category,
    isLoading,
    error,
  } = useFeacher<Category>(`/admin/category/edit/${params.id}`);
  
  if(error&&!isLoading) {
     return NotFound()
  }
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <div className="flex  items-center space-x-3 space-x-reverse mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl mr-3 font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              ویرایش دسته‌بندی جدید
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-8 sm:p-10 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
            </div>
          ):(
            <EditCategoryForm router={router} category={category} />
          )}
        </div>
      </div>
    </div>
  );
}
