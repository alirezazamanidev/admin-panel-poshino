'use client'
import { CallApi } from "../helpers/callApi";
import { handleApiError } from "../helpers/errorHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export async function DeleteUser(id:string){
  
    try {
        const response=await CallApi().delete(`/admin/user/remove/${id}`);

        if(response.status===200){
            
            toast.success(response.data?.message || 'کاربر با موفقیت حذف شد')
            return true
        }
    } catch (error) {
        handleApiError(error)
    }
}