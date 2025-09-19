import { InnerCategoryForm } from '@/components/category/create/InnerCategoryForm';
import { Category } from '@/libs/models/category';
import { createCategory, editCategory } from '@/libs/services/category';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

export interface EditCategoryFormProps {
  router: AppRouterInstance;
  category?: Category;
}

export interface EditCategoryFormValues {
  name: string;
  description: string;
  parentId: string;
  image: File | null;
}

const EditCategoryForm = withFormik<
  EditCategoryFormProps,
  EditCategoryFormValues
>({
  mapPropsToValues: (props) => ({
    name: props.category?.name || '',
    description: props.category?.description || '',
    parentId: props.category?.parentId || '',
    image: null,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('نام دسته‌بندی الزامی است'),
    description: Yup.string().nullable(),
    parentId: Yup.string().nullable(),
    image: Yup.mixed().nullable(),
  }),
  handleSubmit: async (values, { props }) => {
    try {
      await editCategory(values, props?.category?.id as string);
      props.router.push('/categories');
      toast.success('دسته‌بندی با موفقیت ویرایش شد');
    } catch (error) {
      toast.error('خطا در ویرایش دسته‌بندی');
    }
  },
})(InnerCategoryForm);

export default EditCategoryForm;
