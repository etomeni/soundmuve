import { useEffect, useState } from "react";
import axios from "axios";

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { getDecryptedLocalStorage, setEncryptedLocalStorage } from "@/util/storage";
import { useNavigate } from "react-router-dom";
import { useSettingStore } from "@/state/settingStore";


const formSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address"),

    password: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Password"),
});


export function useLoginAuth() {
    const navigate = useNavigate();
    const _loginUser = useUserStore((state) => state._loginUser);
    const _signUpUser = useUserStore((state) => state._signUpUser);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        const result = getDecryptedLocalStorage('uad');
        if (result) {
            setValue("email", result.email || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("password", result.password || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        }
    }, []);
    
    const { 
        handleSubmit, register, setValue, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });
        
    const _onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await axios.post(`${apiEndpoint}/auth/sign-in`, formData )).data;

            if (response && (response.user || response.token)) {
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

                if (rememberMe) {
                    // uad - user auth data;
                    setEncryptedLocalStorage('uad', formData);
                }


                if (!response.user.teamType) {
                    _signUpUser(response.user);
                    
                    navigate("/auth/signup-type");
                    return;
                }

                _loginUser(response.user, response.token, response.refreshToken);

                navigate("/account/", {replace: true});
                return;
            }

            setApiResponse({
                display: true,
                status: false,
                message: response.message || "Oooops, login failed. please try again."
            });
        } catch (error: any) {
            const err = error.response ? error.response.data : error || '';
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, login failed. please try again."
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: err.message || "Oooops, login failed. please try again."
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
        formSchema,
        onSubmit: handleSubmit(_onSubmit),
        register,

        handleClickShowPassword,

        rememberMe,
        setRememberMe,

        showPassword,
        setShowPassword,

        apiResponse,

    }
}



