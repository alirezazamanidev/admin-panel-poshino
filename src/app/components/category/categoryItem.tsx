import { Category } from '@/libs/models/category';
import { formatDate } from '@/libs/utils/functions';
import { Edit, FolderTree, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function CategoryItem({
  category,
  categoryMutate,
}: {
  category: Category;

  categoryMutate: any;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getIndentStyle = (level: number) => {
    return {
      paddingRight: `${level * 2 + 1}rem`,
    };
  };

  return (
    <tr className="hover:bg-gradient-to-l hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-300">
      {/* Category Name with indentation */}
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div
          className="flex items-center space-x-3 sm:space-x-4 space-x-reverse"
          style={getIndentStyle(category?.level)}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={48}
                height={48}
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
              />
            ) : (
              <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              {category?.name}
            </p>
          
          </div>
        </div>
      </td>

      {/* Description */}
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <p className="text-xs sm:text-sm text-gray-600 max-w-xs truncate">
          {category.description ||'-'}
        </p>
      </td>

     

      {/* Created Date */}
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center space-x-3 space-x-reverse text-xs sm:text-sm text-gray-600">
          <span>{formatDate(category.created_at)}</span>
        </div>
      </td>
        {/* Updated Date */}
        <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center space-x-3 space-x-reverse text-xs sm:text-sm text-gray-600">
          <span>{formatDate(category.updated_at)}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
          <button className="p-1.5 sm:p-2 cursor-pointer rounded-lg sm:rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 group">
            <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-500" />
          </button>
      
        </div>
      </td>
    </tr>
  );
}
