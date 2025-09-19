import { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: '404 - صفحه یافت نشد',
  description: 'صفحه مورد نظر شما وجود ندارد.',
}

export default function NotFound() {
  return (
    <html>
        <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-8 text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* 404 Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative z-10">
            <span className="text-3xl font-black text-white">404</span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-red-800 to-purple-800 bg-clip-text text-transparent mb-4 relative z-10">
            صفحه یافت نشد
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed relative z-10">
            صفحه مورد نظر شما وجود ندارد یا ممکن است حذف شده باشد.
          </p>
          
          {/* Action Button */}
          <div className="relative z-10">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 group"
            >
              <svg
                className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              بازگشت به صفحه اصلی
            </a>
          </div>
        </div>
      </div>
    </div>
        </body>
    </html>
  );
}