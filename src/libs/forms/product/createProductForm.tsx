import { InnerProductForm } from "@/components/porduct/InnerProductForm";
import { handleApiError } from "@/libs/helpers/errorHandler";
import { createProduct } from "@/libs/services/product";
import { withFormik } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-hot-toast";
import * as yup from 'yup';

export interface CreateProductFormValues {
  title: string;
  description: string;
  categoryId: string;
  discount: number;
  thumbnail: File
  details: Record<string, string>[];

}
export interface CreateProductFormProps {
    router: AppRouterInstance;
}

const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE_MB = 5;

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('نام محصول الزامی است')
    .min(3, 'نام محصول باید حداقل ۳ کاراکتر باشد')
    .max(100, 'نام محصول نباید بیشتر از ۱۰۰ کاراکتر باشد'),

  description: yup
    .string()
    .required('توضیحات الزامی است')
    .min(20, 'توضیحات باید حداقل ۲۰ کاراکتر باشد')
    .max(2000, 'توضیحات نباید بیشتر از ۲۰۰۰ کاراکتر باشد'),
  
  categoryId: yup
    .string()
    .required('دسته‌بندی الزامی است')
    .uuid('شناسه دسته‌بندی معتبر نیست'),
  
  discount: yup
    .number()
    .required('تخفیف الزامی است')
    .min(0, 'تخفیف نمی‌تواند منفی باشد')
    .max(100, 'تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد'),
  
  thumbnail: yup
    .mixed()
    .test('required', 'تصویر الزامی است', (value) => {
     if(!value) return false;
     return true;
}),
  details: yup.array().of(yup.object().shape({
    key: yup.string().required('ویژگی الزامی است'),
    value: yup.string().required('مقدار الزامی است'),
  })),

});

export const CreateProductForm = withFormik<
  CreateProductFormProps,
  CreateProductFormValues
>({
  mapPropsToValues: (props) => ({
    title: '',
    description: '',
    categoryId: '',
    discount: 0,
    thumbnail: {} as File,
    details: [],
  }),
  validationSchema,
  handleSubmit: async (values, { props }) => {
    try {
      await createProduct(values);
      props.router.push('/products');
      toast.success('محصول با موفقیت ایجاد شد');
    } catch (error) {
      handleApiError(error);
    }
  },
})(InnerProductForm);