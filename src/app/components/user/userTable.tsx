'use client'
import UserItem from "./userItem";
import { User } from "@/libs/models/user";
import { usePaginatedFeach } from "@/libs/hooks/useFeacher";
import LoadingComponent from "../shared/loadingComponent";
import PaginationComponent from "../shared/paginationComponent";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { FilterUser } from "./filterUser";

export default function UserTable() {

    const [page,setPage] = useQueryState('page',parseAsInteger.withDefault(1));
    const [search,setSearch] = useQueryState('search',parseAsString.withDefault(''));
    const [status,setStatus] = useQueryState('status',parseAsString.withDefault(''));
    const onPageChange=(page:number)=>{
        setPage(page);
    }

    const { data, isLoading, error ,meta,mutate} = usePaginatedFeach<User>('/admin/user/list',{
        page,
        limit: 5,
        search,
        status,
        
        
    });


    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <>
          {/* بخش فیلترها */}
          <FilterUser  setSearch={setSearch} setStatus={setStatus} />

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-l from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                      کاربر
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                      اطلاعات تماس
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                      نقش
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                      وضعیت
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                      تاریخ عضویت
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-bold text-gray-900">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.map((user) => (
                    <UserItem key={user.id} user={user} userMutate={mutate} />
                  ))}
                  {
                    error && (
                      <div className="text-red-500 text-center">
                        {error.message}
                      </div>
                    )
                  }
                </tbody>
              </table>
            </div>
            
            {/* پاورقی جدول */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50/50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-gray-600">
                  نمایش {data?.length || 0} کاربر
                </p>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <PaginationComponent currentPage={meta?.page || 1} totalPages={meta?.pageCount || 1} onPageChange={onPageChange} />
                </div>
              </div>
            </div>
          </div>
        </>
       
    )
}