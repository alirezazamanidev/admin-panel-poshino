'use client';
import { parseAsInteger, useQueryState, useQueryStates } from 'nuqs';
import PaginationComponent from '../shared/paginationComponent';
import { usePaginatedFeach } from '@/libs/hooks/useFeacher';
import { Category } from '@/libs/models/category';
import { CategoryItem } from './categoryItem';
const flattenCategoryTree = (
  categories: Category[],
  level = 0,
): (Category & { level: number })[] => {
  const result: Category[] = [];
  
  categories.forEach((category) => {
    result.push({ ...category, level });
    if (category.children && category.children.length > 0) {
      result.push(...flattenCategoryTree(category.children, level + 1));
    }
  });

  return result;
};
export function CategoryTable() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const { data, isLoading, error, meta, mutate } = usePaginatedFeach<Category>(
    '/admin/category/list',
    {
      page,
      limit: 2,
    },
  );

  const flattenedCategories = data ? flattenCategoryTree(data) : [];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-l from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                نام دسته
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                توضیحات
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                تاریخ ایجاد
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                تاریخ آخرین ویرایش
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flattenedCategories.length > 0 ? (
              flattenedCategories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                 
                  categoryMutate={mutate}
                />
              ))
            ) : !isLoading && !error ? (
              <tr>
                <td colSpan={5} className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      هیچ دسته‌بندی یافت نشد
                    </h3>
                    <p className="text-gray-500 text-sm max-w-sm">
                      در حال حاضر هیچ دسته‌بندی در سیستم ثبت نشده است. برای شروع، اولین دسته‌بندی خود را ایجاد کنید.
                    </p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        افزودن دسته‌بندی جدید
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}
            {error && (
              <tr>
                <td colSpan={5} className="text-red-500 text-center py-4">
                  {error.message}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50/50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-600">
            نمایش {flattenedCategories?.length || 0} دسته‌بندی
          </p>
          <div className="flex items-center space-x-2 space-x-reverse">
            <PaginationComponent
              currentPage={meta?.page || 1}
              totalPages={meta?.pageCount || 1}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
