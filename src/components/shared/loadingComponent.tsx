import { Loader2 } from "lucide-react";

export default function LoadingComponent() {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
        <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center space-y-6">
                {/* Animated Loading Spinner */}
                <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 rounded-full animate-spin">
                        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 animate-pulse" />
                    </div>
                </div>
                
                {/* Loading Text */}
                <div className="text-center space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        در حال بارگذاری ...
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                        لطفاً صبر کنید، اطلاعات در حال دریافت است
                    </p>
                </div>
                
                {/* Animated Dots */}
                <div className="flex space-x-1 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
        </div>
    </div>
    )
}

    