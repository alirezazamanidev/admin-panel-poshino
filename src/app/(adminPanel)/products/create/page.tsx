'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Package, 
  Upload, 
  X, 
  Plus, 
  Minus,
  Save,
  ImageIcon
} from 'lucide-react';
import { CreateProductForm } from '@/libs/forms/product/createProductForm';



export default function CreateProductPage() {
  const router = useRouter();
 

  // Convert details array to object

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/60 p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 bg-gradient-to-l from-green-600 via-blue-600 to-purple-600 bg-clip-text ">
                ایجاد محصول جدید
              </h1>
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                اطلاعات محصول جدید را با دقت وارد کنید
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <CreateProductForm router={router} />
      </div>
    </div>
  );
}
