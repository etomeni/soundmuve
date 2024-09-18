import { useState } from "react";

import axios from "axios";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useNavigate } from "react-router-dom";
import { useSettingStore } from "@/state/settingStore";


const formSchema = yup.object({
    password: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Password"),

    confirmPassword: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Confirm Password"),
    
});


export function useNewPasswordAuth() {
    const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
         
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const { 
        handleSubmit, register, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });

        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (formData.password !== formData.confirmPassword) {
            setError("password", {message: "Passwords do not match"});
            setError("confirmPassword", {message: "Passwords do not match"});
            return;
        }

        const data2db = {
            email: userData.email,
            password: formData.password
        };

        try {
            const response = (await axios.post(`${apiEndpoint}/auth/forgot-password`, data2db )).data;
            // console.log(response);
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            navigate("/auth/login", {replace: true});
        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to reset password. please try again."
            });
        }
    }


    // const onSubmit = useCallback(() => {
    //     handleSubmit(_onSubmit)
    // }, []);


    return {
        errors,
        isValid,
        isSubmitting,
        // formSchema,
        onSubmit: handleSubmit(onSubmit),
        register,

        // userData,

        handleClickShowPassword,
        showPassword, setShowPassword,

        apiResponse,
    }
}
