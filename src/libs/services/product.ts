import { CreateProductFormValues } from "../forms/product/createProductForm";
import { CallApi } from "../helpers/callApi";

export const createProduct = async (values: CreateProductFormValues) => {

        const formData = new FormData();
        if (values.details && Array.isArray(values.details)) {
            const detailsObject: Record<string, string> = {};
            values.details.forEach((detail) => {
                if (detail.key && detail.value) {
                    detailsObject[detail.key] = detail.value;
                }
            });
            formData.append('details', JSON.stringify(detailsObject));
        }
        
        // اضافه کردن سایر فیلدها
        for (const [key, value] of Object.entries(values)) {
            if (value && key !== 'details') {
                formData.append(key, value);
            }
        }
        
        const response = await CallApi().post('/admin/product/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        if (response.status === 201) {
            return response.data;
        }
        return response.data;

};