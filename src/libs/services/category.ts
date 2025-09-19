import { CreateCategoryFormValues } from "../forms/category/createCategoryForm";
import { CallApi } from "../helpers/callApi";
import { handleApiError } from "../helpers/errorHandler";

export const createCategory = async (values:CreateCategoryFormValues) => {
    try {   
        const formData = new FormData();
        for(const [key, value] of Object.entries(values)){
            if(value){
                formData.append(key, value);
            }
        }
        const response = await CallApi().post('/admin/category/create', formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(response.status===201){
            return response.data;
        }
        return response.data;
    } catch (error) {
      handleApiError(error);
    }
}

