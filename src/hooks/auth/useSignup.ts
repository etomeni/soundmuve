import { useEffect, useState } from "react";

import axios from "axios";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useNavigate } from "react-router-dom";
import { getUserIP } from "@/util/location";


const formSchema = yup.object({
    firstName: yup.string().required().min(2).trim().label("First Name"),
    lastName: yup.string().required().min(2).trim().label("Last Name"),

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

    confirmPassword: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Confirm Password"),

    // tnc: yup.boolean().required().label("Terms and conditions")
});

export function useSignupAuth() {
    const navigate = useNavigate();
    const [tnc, setTnc] = useState(true);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const _signUpUser = useUserStore((state) => state._signUpUser);
    const [userIP, setUserIP] = useState("");
  
    useEffect(() => {
        getUserIP().then((res: string) => {
            if (res) {
                setUserIP(res);
            }
        });
    }, []);
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const { 
        handleSubmit, register, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        if (formData.password !== formData.confirmPassword) {
            setError("password", {message: "Passwords do not match"});
            setError("confirmPassword", {message: "Passwords do not match"});
            return;
        }

        try {
            const response = (await axios.post(`${apiEndpoint}/auth/sign-up`, { ...formData, ip: userIP })).data;
            // console.log(response);
            
            if (response && response.savedUser) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: response.message
                });

                _signUpUser(response.savedUser);

                navigate("/auth/signup-type");
                return;
            }

            setApiResponse({
                display: true,
                status: false,
                message: response.message || "Oooops, registration failed. please try again."
            });
        } catch (error: any) {
            // console.log(error);
            const err = error.response.data;

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, registration failed. please try again."
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
        onSubmit: handleSubmit(onSubmit),
        register,

        handleClickShowPassword,

        tnc,
        setTnc,

        showPassword,
        setShowPassword,

        apiResponse,
    }
}
