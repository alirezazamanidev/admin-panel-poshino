'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as yup from 'yup';
import { withFormik } from 'formik'
import InnerLoginForm from "@/app/components/auth/InnerLoginForm";

interface LoginFormProps {
 router:AppRouterInstance
}
interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}
const validationSchema = yup.object().shape({
  username: yup.string().required('نام کاربری الزامی است'),
  password: yup.string().required('رمز عبور الزامی است'),
  rememberMe: yup.boolean()
});

export const LoginForm = withFormik<LoginFormProps, LoginFormValues>({
 mapPropsToValues: (props) => ({
  username: '',
  password: '',
  rememberMe: false,
 }),
 validationSchema,
 handleSubmit: (values, { props }) => {
    
 },
 
})(InnerLoginForm);