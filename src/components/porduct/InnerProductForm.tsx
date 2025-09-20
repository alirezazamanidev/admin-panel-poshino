'use client'
import { CreateProductFormValues } from "@/libs/forms/product/createProductForm";
import { useFeacher } from "@/libs/hooks/useFeacher";
import { Category } from "@/libs/models/category";
import { Product } from "@/libs/models/product";
import { Form, FormikProps } from "formik"
import { ImageIcon, Link, Minus, Plus, Save, Upload, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react";

interface InnerProductFormProps extends FormikProps<CreateProductFormValues> {
    product?: Product | null;
}
interface DetailItem {
    key: string;
    value: string;
  }
export const InnerProductForm = ({ product, values, handleChange, isSubmitting, setFieldValue, errors, touched }: InnerProductFormProps) => {


    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [details, setDetails] = useState<DetailItem[]>([{ key: '', value: '' }]);
     // Remove image
  const removeImage = () => {
   
    setImagePreview(null);
    setFieldValue('thumbnail', null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

   // Handle image upload
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      
      setFieldValue('thumbnail', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDetailItem = (index: number, field: 'key' | 'value', value: string) => {
    const updatedDetails = details.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setDetails(updatedDetails);
    handleChange({ target: { name: 'details', value: updatedDetails } })
  };

  // Handle details array
  const addDetailItem = () => {
    const updatedDetails = [...details, { key: '', value: '' }];
    setDetails(updatedDetails);
    handleChange({ target: { name: 'details', value: updatedDetails } })
  };

  const removeDetailItem = (index: number) => {
    if (details.length > 1) {
       const updatedDetails = details.filter((_, i) => i !== index);
       setDetails(updatedDetails);
       handleChange({ target: { name: 'details', value: updatedDetails } })
      
    }
  };
  
  const {data:categories,isLoading:isCategoriesLoading,error:categoriesError}=useFeacher<Category[]>(`/admin/category/categories`)
    return (
        <Form  className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/60 p-6 sm:p-8 space-y-8">
          
        {/* Title - Required */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            عنوان محصول <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={values.title || ''}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base font-medium bg-white/90 backdrop-blur-sm placeholder-gray-400 ${
              errors.title && touched.title 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="نام محصول را وارد کنید..."
            
          />
          {errors.title && touched.title && (
            <p className="text-red-500 text-sm mt-2 font-medium">{errors.title as string}</p>
          )}
        </div>

        {/* Description - Required */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            توضیحات <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={values.description || ''}
            onChange={handleChange}
            rows={5}
            className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base font-medium bg-white/90 backdrop-blur-sm resize-none placeholder-gray-400 ${
              errors.description && touched.description 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="توضیحات کاملی از محصول ارائه دهید..."
            
          />
          {errors.description && touched.description && (
            <p className="text-red-500 text-sm mt-2 font-medium">{errors.description as string}</p>
          )}
        </div>

        {/* Category - Required */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            دسته‌بندی <span className="text-red-500">*</span>
          </label>
          <select
            name="categoryId"
            value={values.categoryId || ''}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base font-medium bg-white/90 backdrop-blur-sm ${
              errors.categoryId && touched.categoryId 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500'
            }`}
            
          >
            <option value="">دسته‌بندی مناسب را انتخاب کنید</option>
            {!isCategoriesLoading && !categoriesError && categories?.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.categoryId && touched.categoryId && (
            <p className="text-red-500 text-sm mt-2 font-medium">{errors.categoryId as string}</p>
          )}
        </div>

        {/* Discount - Optional */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            تخفیف <span className="text-gray-400 text-sm font-normal">(اختیاری)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="discount"
              value={values.discount || ''}
              onChange={handleChange}
              min="0"
              max="100"
              className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-base font-medium bg-white/90 backdrop-blur-sm placeholder-gray-400 ${
                errors.discount && touched.discount 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="درصد تخفیف (0 تا 100)"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              %
            </div>
          </div>
          {errors.discount && touched.discount && (
            <p className="text-red-500 text-sm mt-2 font-medium">{errors.discount as string}</p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            در صورت عدم وارد کردن، تخفیف صفر در نظر گرفته می‌شود
          </p>
        </div>

        {/* Thumbnail Image */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            تصویر thumbnail محصول <span className="text-red-500">*</span>
          </label>
          {!imagePreview ? (
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`border-2 border-dashed rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 bg-white/60 backdrop-blur-sm group-hover:shadow-lg ${
                errors.thumbnail && touched.thumbnail 
                  ? 'border-red-300 bg-red-50/30' 
                  : 'border-gray-300'
              }`}>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Upload className="w-10 h-10 text-blue-500" />
                </div>
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  برای آپلود تصویر کلیک کنید
                </p>
                <p className="text-gray-500 text-sm">
                  فرمت‌های مجاز: JPG, PNG, GIF • حداکثر 5MB
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="border-2 border-gray-200 rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-lg">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
                  {/* تصویر بزرگ‌تر */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/80 flex-shrink-0">
                    <Image
                      src={imagePreview}
                      alt="پیش‌نمایش تصویر محصول"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-right space-x-2">
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-3 rounded-full w-full shadow-sm"></div>
                    </div>
                  
                  </div>

                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-3 rounded-2xl bg-red-50 hover:bg-red-100 transition-all duration-200 shadow-md hover:shadow-lg group border border-red-100"
                  >
                    <X className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {errors.thumbnail && touched.thumbnail && (
            <p className="text-red-500 text-sm mt-2 font-medium">{errors.thumbnail as string}</p>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-lg font-bold text-gray-900">
              جزئیات محصول <span className="text-gray-400 text-sm font-normal">(اختیاری)</span>
            </label>
            <button
              type="button"
              onClick={addDetailItem}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-xl hover:from-green-200 hover:to-blue-200 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>افزودن جزئیات</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {details.map((detail, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse p-4 bg-gray-50/80 rounded-xl border border-gray-200">
                <div className="w-full sm:flex-1">
                  <input
                    type="text"
                    value={detail.key}
                    onChange={(e) => updateDetailItem(index, 'key', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all duration-300 font-medium bg-white/90 backdrop-blur-sm placeholder-gray-400 ${
                      errors.details && Array.isArray(errors.details) && errors.details[index] && (errors.details[index] as any)?.key
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="ویژگی (مثال: رنگ، سایز، جنس)"
                  />
                  {errors.details && Array.isArray(errors.details) && errors.details[index] && (errors.details[index] as any)?.key && (
                    <p className="text-red-500 text-sm mt-1 font-medium">{(errors.details[index] as any).key}</p>
                  )}
                </div>
                <div className="w-full sm:flex-1">
                  <input
                    type="text"
                    value={detail.value}
                    onChange={(e) => updateDetailItem(index, 'value', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all duration-300 font-medium bg-white/90 backdrop-blur-sm placeholder-gray-400 ${
                      errors.details && Array.isArray(errors.details) && errors.details[index] && (errors.details[index] as any)?.value
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="مقدار (مثال: قرمز، بزرگ، پنبه)"
                  />
                  {errors.details && Array.isArray(errors.details) && errors.details[index] && (errors.details[index] as any)?.value && (
                    <p className="text-red-500 text-sm mt-1 font-medium">{(errors.details[index] as any).value}</p>
                  )}
                </div>
                {details.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDetailItem(index)}
                    className="p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-200 shadow-md hover:shadow-lg group border border-red-100"
                  >
                    <Minus className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
         
          <p className="text-gray-500 text-sm mt-3">
            جزئیات اضافی مانند جنس و سایر مشخصات محصول را اضافه کنید
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-5 sm:space-x-reverse pt-8 border-t-2 border-gray-100">
          <Link href="/products" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm bg-white/90"
            >
              انصراف
            </button>
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white font-black rounded-2xl hover:from-green-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Save className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">
              {isSubmitting ? 'در حال ایجاد محصول...' : 'ایجاد محصول'}
            </span>
          </button>
        </div>
      </Form>
    )
}