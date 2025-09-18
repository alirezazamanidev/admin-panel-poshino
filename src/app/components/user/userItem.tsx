'use client'

import { User } from "@/libs/models/user"
import { formatDate } from "@/libs/utils/functions";
import { Calendar, Mail, Phone, Shield, ShieldCheck, Trash2 } from "lucide-react"

export default function UserItem({user}: {user: User}) {
    const getStatusColor = (status: boolean, isBlocked?: boolean) => {
        if (isBlocked) {
          return 'bg-orange-100 text-orange-800 border-orange-200';
        }
        return status === true
          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
          : 'bg-red-100 text-red-800 border-red-200';
      };
    
      const getRoleColor = (role: string) => {
        return role === 'admin'
          ? 'bg-purple-100 text-purple-800 border-purple-200'
          : 'bg-blue-100 text-blue-800 border-blue-200';
      };

      const getStatusText = (status: boolean, isBlocked?: boolean) => {
        if (isBlocked) {
          return 'بلاک شده';
        }
        return status === true ? 'فعال' : 'غیرفعال';
      };

      const getStatusDotColor = (status: boolean, isBlocked?: boolean) => {
        if (isBlocked) {
          return 'bg-orange-500';
        }
        return status === true ? 'bg-emerald-500' : 'bg-red-500';
      };
   
    return (
        <tr
        
        className="hover:bg-gradient-to-l hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-300"
      >
        {/* User Info */}
        <td className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs sm:text-sm">
                {/* {user.avaar} */}
              </span>
            </div>
            <div>
            {
                user?.fullname? 
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                {user.fullname}
              </p>
                :
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                تعریف نشده
              </p>
            }
            
            </div>
          </div>
        </td>

        {/* Contact Info */}
        <td className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="space-y-1">
           
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{user?.phone}</span>
            </div>
          </div>
        </td>

        {/* Role */}
        <td className="px-4 sm:px-6 py-3 sm:py-4">
          <span
            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border ${getRoleColor(
              user.role,
            )}`}
          >
            {user.role === 'admin' ? (
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            ) : (
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            )}
            {user.role}
          </span>
        </td>

        {/* Status */}
        <td className="px-4 sm:px-6 py-3 sm:py-4">
          <span
            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border ${getStatusColor(
              user.phone_verified,
              user.isBlocked
            )}`}    
          >
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ml-2 ${getStatusDotColor(
                user.phone_verified,
                user.isBlocked
              )}`}
            ></div>
            {getStatusText(user.phone_verified, user.isBlocked)}
          </span>
        </td>

        {/* Join Date */}
        <td className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 space-x-reverse text-xs sm:text-sm text-gray-600">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{formatDate(user.created_at)}</span>
          </div>
        </td>
        {/* Actions */}
        <td className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
            
            <button className="p-1.5 sm:p-2 cursor-pointer rounded-lg sm:rounded-xl hover:bg-red-50 transition-all duration-200 hover:scale-105 group">
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-red-500" />
            </button>
         
          </div>
        </td>
      </tr>
    )
}