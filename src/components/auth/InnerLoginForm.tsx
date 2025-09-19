'use client';
import { Field, Form, FormikProps } from 'formik';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useState } from 'react';

export default function InnerLoginForm({ isSubmitting }: FormikProps<any>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form className="space-y-6">
      {/* Username Field */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          نام کاربری
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <Field
            autoComplete="current-username"
            
            type="text"
            id="username"
            name="username"
            className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-right"
            placeholder="نام کاربری خود را وارد کنید"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          رمز عبور
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Field
          
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            name="password"
            className="block w-full pr-10 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-right"
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 left-0 pl-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Field
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="rememberMe"
            className="mr-2 block text-sm text-gray-700"
          >
            مرا به خاطر بسپار
          </label>
        </div>
        
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
            در حال ورود...
          </div>
        ) : (
          'ورود به پنل'
        )}
      </button>
    </Form>
  );
}
