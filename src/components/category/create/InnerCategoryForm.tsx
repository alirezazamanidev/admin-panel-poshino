import { Form, FormikProps } from 'formik';
import { FolderPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Upload } from 'lucide-react';
import { X } from 'lucide-react';

import { Category } from '@/libs/models/category';
import { useEffect, useState } from 'react';
import { useFeacher } from '@/libs/hooks/useFeacher';

interface InnerCategoryFormProps extends FormikProps<any> {
  category?: Category | null;
}

export function InnerCategoryForm({
  isSubmitting,
  values,
  setFieldValue,
  handleChange,
  category,
}: InnerCategoryFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFieldValue('image', file);
    }
  };
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFieldValue('image', null);
  };
  useEffect(() => {
    if (category) {
      setImagePreview(category.imageUrl);
    }
  }, [category]);

  let { data: categories, isLoading: isCategoriesLoading } = useFeacher<
    Category[]
  >('/admin/category/categories');

  categories=categories?.filter((cate)=>cate.id!==category?.id)
  return (
    <Form className="space-y-8 relative z-10">
      {/* Name Field */}
      <div className="group">
        <label
          htmlFor="name"
          className="block text-sm font-bold text-gray-900 mb-3 items-center space-x-2 space-x-reverse"
        >
          <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
          <span>نام دسته‌بندی *</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-right bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-gray-300"
            placeholder="نام دسته‌بندی را وارد کنید"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* Description Field */}
      <div className="group">
        <label
          htmlFor="description"
          className="block text-sm font-bold text-gray-900 mb-3 items-center space-x-2 space-x-reverse"
        >
          <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></span>
          <span>توضیحات (اختیاری)</span>
        </label>
        <div className="relative">
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-right resize-none bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-gray-300"
            placeholder="توضیحات دسته‌بندی را وارد کنید"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* Parent Category Field */}
      <div className="group">
        <label
          htmlFor="parentId"
          className="block text-sm font-bold text-gray-900 mb-3  items-center space-x-2 space-x-reverse"
        >
          <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
          <span>دسته‌بندی والد *</span>
        </label>
        <div className="relative">
          <select
            id="parentId"
            name="parentId"
            value={values?.parentId || ''}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-right bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md group-hover:border-gray-300 appearance-none"
          >
            <option value="">دسته اصلی</option>
            {isCategoriesLoading ? (
              <option value="">در حال بارگذاری...</option>
            ) : (
              categories?.map((cate) => (
                <option key={cate.id} value={cate.id}>
                  {cate.name}
                </option>
              ))
            )}
          </select>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* Image Upload Field */}
      <div className="group">
        <label className="block text-sm font-bold text-gray-900 mb-3  items-center space-x-2 space-x-reverse">
          <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
          <span>تصویر دسته‌بندی (اختیاری)</span>
        </label>

        {!imagePreview ? (
          <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-blue-50/30 hover:from-blue-50/50 hover:to-purple-50/30 group-hover:shadow-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900 mb-1">
                    برای آپلود تصویر کلیک کنید
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF تا 10MB</p>
                </div>
              </div>
            </label>
          </div>
        ) : (
          <div className="relative">
            <div className="border-2 border-gray-200 rounded-2xl p-6 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center space-x-5 space-x-reverse">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeImage}
                  className="p-3 rounded-2xl bg-red-50 hover:bg-red-100 transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <X className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end space-x-5 space-x-reverse pt-8 border-t-2 border-gray-100">
        <Link href="/categories" className=" cur">
          <button
            type="button"
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm bg-white/80"
          >
            انصراف
          </button>
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex mr-4 items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-black rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <FolderPlus className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform duration-300" />
          {category ? (
            <span className="relative z-10">
              {isSubmitting ? 'در حال ویرایش...' : 'ویرایش دسته‌بندی'}
            </span>
          ) : (
            <span className="relative z-10">
              {isSubmitting ? 'در حال ایجاد...' : 'ایجاد دسته‌بندی'}
            </span>
          )}
        </button>
      </div>
    </Form>
  );
}
