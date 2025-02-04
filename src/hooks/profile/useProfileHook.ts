import { useState } from "react";

import axios from "axios";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { apiEndpoint } from "@/util/resources";
import { useUserStore } from "@/state/userStore";


const formSchema = yup.object({
    firstName: yup.string().required().min(2).trim().label("First Name"),
    lastName: yup.string().required().min(2).trim().label("Last Name"),
    phoneNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Phone Number"),
    country: yup.string().required().min(2).trim().label("Country"),

    artistName: yup.string().optional().trim().label("Artist name"),
    gender: yup.string().optional().trim().label("Gender"),

    recordLabelName: yup.string().optional().trim().label("Record label name"),
});

export function useProfileHook() {
    // const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const _updateUser = useUserStore((state) => state._updateUser);

    const [imageRl, setImageRl] = useState();

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const { 
        handleSubmit, register, setValue, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        try {
            if (userData.userType == "artist") {
                if (!formData.artistName) {
                    setApiResponse({
                        display: true,
                        status: false,
                        message: "Artist name is required."
                    });
                    return;
                }
                if (!formData.gender) {
                    setApiResponse({
                        display: true,
                        status: false,
                        message: "Gender is required."
                    });
                    return;
                }
            };
            const artistData2db = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                country: formData.country,
                gender: formData.gender,
                artistName: formData.artistName,
            };


            if (userData.userType == "record label") {
                if (!formData.recordLabelName) {
                    setApiResponse({
                        display: true,
                        status: false,
                        message: "Record label name is required."
                    });
                    return;
                }
            }
            const rlData2db = new FormData();
            // rlData2db.append('user_id', userData._id || '');
            rlData2db.append('firstName', formData.firstName);
            rlData2db.append('lastName', formData.lastName);
            rlData2db.append('phoneNumber', formData.phoneNumber);
            rlData2db.append('country', formData.country);
            rlData2db.append('recordLabelName', formData.recordLabelName || '');
            if (imageRl) rlData2db.append('recordLabelLogo', imageRl);

            const response = (await axios.patch(
                // `${apiEndpoint}/rlProfile/edit/:user_id`,
                userData.userType == "record label" ? `${apiEndpoint}/rlProfile/edit/${userData._id}` : `${apiEndpoint}/artistProfile/edit/${userData._id}`,
                userData.userType == "record label" ? rlData2db : artistData2db,
                {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${accessToken}`,
                        ...(userData.userType == "record label" && {"Content-Type": "multipart/form-data"})
                    },
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
            console.log(response);
            
            if (response.status) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: response.message
                });

                _updateUser(response.result);
                return;
            }

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message || "Oooops, an error occured."
            // });
        } catch (error: any) {
            // console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, an error occured.";

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }

    }
    

    return {
        errors,
        isValid,
        isSubmitting,
        formSchema,
        onSubmit: handleSubmit(onSubmit),
        register,
        setValue,

        apiResponse,
        imageRl, setImageRl,
    }
}
