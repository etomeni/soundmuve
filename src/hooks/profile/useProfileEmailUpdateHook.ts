import { useState } from "react";

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { passwordRegex } from "@/util/resources";
import { useUserStore } from "@/state/userStore";
import { removeSessionStorageItem, setSessionStorage } from "@/util/storage";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


const formSchema = yup.object({
    email: yup.string().required()
        .email("Please enter a valid email address.")
        .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
        , "Please enter a valid email address.")
        .trim().label("Email Address"),
    
    password: yup.string().required()
        .min(6, 'Password must be at least 6 characters')
        .matches( passwordRegex,
          'Password must include uppercase, lowercase, digit, and special character'
        ).trim().label("Password"),
});

// create a custom hook and pass this data below to it, use typescipt
interface _Props {
    modalViews?: {
        // status: boolean,
        verifyEmailModal: (state: boolean) => void,
        updateEmailModal: (state: boolean) => void,
    }
}
export const useProfileEmailUpdateHook = (props: _Props) => {
    // const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);
    // const accessToken = useUserStore((state) => state.accessToken);
    const _updateUser = useUserStore((state) => state._updateUser);

    const [isSubmittingOtpCode, setIsSubmittingOtpCode] = useState(false);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const [code, setCode] = useState(new Array(4).fill(""));

    const { 
        handleSubmit, register, reset, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            if (formData.email.toLowerCase() == userData.email.toLowerCase() ) {
                setApiResponse({
                    display: true,
                    status: false,
                    message: "New Email Address can not be same as current email address."
                });
                return;
            }

            const response = (await apiClient.post(
                `/profile/sendEmailUpdateCode/${userData._id}`,
                {email: formData.email, password: formData.password},
                {
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            // setSongUploadProgress(percentage);
                        }
                    },
                }
            )).data;
            // console.log(response);
            
            if (response.status) {
                setSessionStorage(
                    "emailUpdate",
                    {
                        jwtToken: response.result.token,
                        newEmail: formData.email,
                    }
                );

                setApiResponse({
                    display: true,
                    status: true,
                    message: response.message
                });

                setTimeout(() => {
                    if (props.modalViews) {
                        props.modalViews.verifyEmailModal(true);
                        props.modalViews.updateEmailModal(false);
                    }
                }, 2000);
            }

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message || "Oooops, an error occured."
            // });
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);
            
            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }

    }

    const handleResendOtp = async (email: string) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            if (email.toLowerCase() == userData.email.toLowerCase() ) {
                setApiResponse({
                    display: true,
                    status: false,
                    message: "New Email Address can not be same as current email address."
                });
                return;
            }

            const response = (await apiClient.post(
                `/profile/resendEmailUpdateCode/${userData._id}`,
                {email},
                {
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            // setSongUploadProgress(percentage);
                        }
                    },
                }
            )).data;
            // console.log(response);
            
            if (response.status) {

                setSessionStorage(
                    "emailUpdate",
                    {
                        jwtToken: response.result.token,
                        newEmail: email,
                    }
                );

                setApiResponse({
                    display: true,
                    status: true,
                    message: response.message
                });

            }

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message || "Oooops, an error occured."
            // });
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }

    }

    const verifyNewEmailCode = async (otpCode: string, newEmailAddress: string, jwtToken: string) => {
        setIsSubmittingOtpCode(true);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });
        const dataSent = {
            email: newEmailAddress, 
            code: otpCode, 
            token: jwtToken 
        };

        try {
            const response = (await apiClient.post(
                `/profile/verifyEmailUpdateCode/${userData._id}`,
                dataSent,
                {
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            // setSongUploadProgress(percentage);
                        }
                    },
                }
            )).data;
            // console.log(response);
            
            if (response.status) {
                removeSessionStorageItem("emailUpdate");

                setApiResponse({
                    display: true,
                    status: true,
                    message: response.message
                });

                setTimeout(() => {
                    if (props.modalViews) {
                        props.modalViews.verifyEmailModal(false);
                        props.modalViews.updateEmailModal(false);
                    }
                }, 2000);

                _updateUser(response.result);
            }

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message || "Oooops, an error occured."
            // });

            setIsSubmittingOtpCode(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmittingOtpCode(false);
        }

    }
    

    const handleChange = (e: any, index: any) => {
        if (isNaN(e.target.value)) return false;
        setCode([ ...code.map((data, i) => (i === index ? e.target.value : data)) ])

        // set focus on the next input when the first value is set.
        const nextSibling = document.getElementById(`code${index + 1}`);
        if (e.target.value && nextSibling) {
            // console.log(e.target.nextSibling);
            document.getElementById(`code${index + 1}`)?.focus();
        }
    }

    const handlePaste = (e: any) => {
        const value = e.clipboardData.getData("text");
        // console.log(value);
        
        if (isNaN(value)) return false; // check if its a number
        // converts it to an array of string and ensure the length of the string is same as that of the code
        const updatedValue = value.toString().split("").slice(0, code.length); 
        setCode(updatedValue);

        const focusInput = e.target.parentNode.querySelector("input:focus");
        if (focusInput) {
            focusInput.blur(); // remove focus from the input's
        }
    }

    const handleDelete = (e: any, _index: any) => {
        if ((e.which === 8 || e.keyCode === 8) && e.target.value === "") {
            const updatedValue = code.join('').split('').concat(Array(code.length).fill('')).slice(0, code.length);
            setCode(updatedValue);

            const lastInput = document.getElementById(`code${code.join('').length - 1}`);
            if (lastInput) {
                lastInput.focus();
            } 
            return;
        }
    }
    

    return {
        errors,
        isValid,
        isSubmitting,
        formSchema,
        onSubmit: handleSubmit(onSubmit),
        register,
        reset,

        apiResponse, setApiResponse,
        verifyNewEmailCode,

        code, setCode,
        handleResendOtp,
        handleChange,
        handlePaste,
        handleDelete,
        isSubmittingOtpCode, setIsSubmittingOtpCode,
    }
}
