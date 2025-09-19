'use client'
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };

    return (
        <div className="flex justify-center">
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <div className="flex items-center">
                        بعدی
                        <ChevronLeft className="w-4 h-4 mr-1" />
                    </div>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={totalPages}
                previousLabel={
                    <div className="flex items-center">
                        <ChevronRight className="w-4 h-4 ml-1" />
                        قبلی
                    </div>
                }
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
                containerClassName="flex items-center space-x-2 space-x-reverse"
                pageClassName="page-item"
                pageLinkClassName="px-3 py-2 text-sm font-medium bg-white/80 backdrop-blur-xl text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                previousClassName="page-item"
                previousLinkClassName="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                nextClassName="page-item"
                nextLinkClassName="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                breakClassName="page-item"
                breakLinkClassName="px-3 py-2 text-sm text-gray-400"
                activeClassName="active"
                activeLinkClassName="!bg-gradient-to-l !from-blue-500 !to-purple-600 !text-white !shadow-lg !border-transparent"
                disabledClassName="disabled"
                disabledLinkClassName="!opacity-50 !cursor-not-allowed"
            />
        </div>
    )
}