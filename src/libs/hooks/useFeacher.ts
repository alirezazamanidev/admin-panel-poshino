import useSWR, { KeyedMutator } from 'swr';

import { CallApi } from '../helpers/callApi';
import { handleApiError } from '../helpers/errorHandler';

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  mutate: KeyedMutator<any>;
  isLoading: boolean;
  error: any
  meta: {
    totalCount: number;
    page: number;
    limit: number;
    pageCount: number;
  };
}

const fetcher = async (url: string) => {
  try {
    const response = await CallApi().get(url);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

// کانفیگ پیش‌فرض SWR
const defaultConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

// هوک برای دریافت لیست با صفحه‌بندی
export function usePaginatedFeach<T>(
  endpoint: string,
  params: PaginationParams = {},
  config = {},
): PaginatedResponse<T> {
  // ساخت URL با پارامترها
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const url = `${endpoint}?${searchParams.toString()}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    ...defaultConfig,
    ...config,
  });

  return {
    data: data?.data?.data || [],
    meta: data?.data?.meta || {},
    isLoading,
    error,
    mutate,
  };
}

// // هوک برای دریافت آیتم تکی
// export function useSingleItem<T>(
//   endpoint: string,
//   id: string | number | null,
//   config = {},
// ) {
//   const url = id ? `${endpoint}/${id}` : null;

//   const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
//     ...defaultConfig,
//     ...config,
//   });

//   return {
//     data,
//     isLoading,
//     error,
//     mutate,
//   };
// }

// // هوک برای دریافت داده‌های ساده (بدون صفحه‌بندی)
// export function useApiData<T>(endpoint: string, config = {}) {
//   const { data, error, isLoading, mutate } = useSWR<T>(endpoint, fetcher, {
//     ...defaultConfig,
//     ...config,
//   });

//   return {
//     data,
//     isLoading,
//     error,
//     mutate,
//   };
// }
