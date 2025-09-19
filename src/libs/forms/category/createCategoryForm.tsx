import { InnerCategoryForm } from '@/app/components/category/create/InnerCategoryForm';
import { createCategory } from '@/libs/services/category';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import * as Yup from 'yup';
export interface CreateCategoryFormProps {
  router: AppRouterInstance;
}

export interface CreateCategoryFormValues {
  name: string;
  description: string;
  parentId: string;
  image?: File | null;
}

const CreateCategoryForm = withFormik<
  CreateCategoryFormProps,
  CreateCategoryFormValues
>({
  mapPropsToValues: (props) => ({
    name: '',
    description: '',
    parentId: '',
    image: null,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('نام دسته‌بندی اجباری است'),
    description: Yup.string().optional(),
    parentId: Yup.string().optional(),
    image: Yup.mixed().optional(),
  }),
  handleSubmit: async(values, { props }) => {
    await createCategory(values);
    props.router.push('/categories');
  },
})(InnerCategoryForm)

export default CreateCategoryForm;