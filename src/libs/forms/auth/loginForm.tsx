'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as yup from 'yup';
import { withFormik } from 'formik'
import InnerLoginForm from "@/app/components/auth/InnerLoginForm";
import { handleApiError } from "@/libs/helpers/errorHandler";
import { CallApi } from "@/libs/helpers/callApi";
import { toast } from "react-hot-toast";

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
 handleSubmit: async(values, { props }) => {
    
    try {
        const response = await CallApi().post('/admin/login', {
            username: values.username,
            password: values.password,
            rememberMe: values.rememberMe ? 'on' : 'off'
        })
        if(response.status === 200){
            toast.success('ورود با موفقیت انجام شد')
            props.router.push('/')
        }
    } catch (error) {
        handleApiError(error)
    }
 },
 
})(InnerLoginForm);