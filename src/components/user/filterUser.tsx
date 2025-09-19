'use client'
import { Search, Filter, RefreshCw, Users } from "lucide-react";
import { useState } from "react";


export function FilterUser({setSearch,setStatus }: {setSearch: (search: string) => void,setStatus: (status: string) => void}) {
    const [searchTerm,setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
   
    const handleFiler = () => {
        setSearch(searchTerm);
        setStatus(statusFilter);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setSearch('');
        setStatus('');
    };
    
    return (
    
          <div className="bg-gradient-to-br from-white/90 via-blue-50/30 to-purple-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 p-6 mb-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">فیلترهای جستجو</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-6 relative group">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام، شماره تلفن..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  
                  className="w-full pr-12 pl-4 py-3.5 border-2 border-gray-200/80 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 text-base placeholder-gray-400 hover:border-gray-300"
                />
              </div>

              {/* Status Filter */}
              <div className="lg:col-span-3 relative group">
                <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors duration-300" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pr-12 pl-4 py-3.5 border-2 border-gray-200/80 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/70 text-base appearance-none cursor-pointer hover:border-gray-300"
                >
                  <option value="all">همه وضعیت‌ها</option>
                  <option value="active">✅ فعال</option>
                  <option value="inactive">❌ غیرفعال</option>
                  <option value="blocked">🚫 بلاک شده</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-3 flex gap-2">
                <button
                  onClick={handleFiler}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  جستجو
                </button>

                <button
                  onClick={handleClearFilters}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 focus:ring-4 focus:ring-gray-300/30 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] border border-gray-300/50"
                >
                  <RefreshCw className="w-4 h-4" />
                  پاک کردن
                </button>
              </div>
            </div>

            {/* Filter Status Indicator */}
            {(searchTerm || statusFilter !== 'همه') && (
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">فیلترهای فعال:</span>
                  {searchTerm && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      جستجو: {searchTerm}
                    </span>
                  )}
                  {statusFilter !== 'all' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      وضعیت: {statusFilter}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
    )
}