import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { albumRelease3Interface } from '@/typeInterfaces/release.interface';
import { albumRelease3FormSchema } from '../releaseFormSchema';
import { apiEndpoint } from '@/util/resources';
import { musicStores, socialPlatformStores } from '@/util/resources';


export function useCreateAlbum3() {
    const navigate = useNavigate();

    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);
    const accessToken = useUserStore((state) => state.accessToken);
    const _handleSetAlbumRelease3 = useCreateReleaseStore((state) => state._handleSetAlbumRelease3);

    const [selectStores, setSelectStores] = useState<string[]>(musicStores);
    const [selectSocialStores, setSelectSocialStores] = useState<string[]>(socialPlatformStores);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const { 
        handleSubmit, register, setValue, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(albumRelease3FormSchema),
        mode: 'onBlur',
    });


    useEffect(() => {
        restoreValues()
    }, [albumRelease]);
    
    const restoreValues = () => {
        if (albumRelease.stores) {
            handleStoreSelect(albumRelease.stores);
        }

        if (albumRelease.socialPlatforms) {
            handleSocialStoreSelect(albumRelease.socialPlatforms);
        }
    }


    const handleStoreSelect = useCallback((selected: string[]) => {
        setSelectStores(selected);
        setValue("store", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }, []);

    const handleSocialStoreSelect = useCallback((selected: string[]) => {
        setSelectSocialStores(selected);
        setValue("socialPlatform", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }, []);
    

    const onSubmit = async (formData: typeof albumRelease3FormSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        
        if (formData.store && formData.store == "Select" ) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Select stores to distribute your music to."
            })

            setError("store", {message: "Select stores to distribute your music to."})
            return;
        }

        if (formData.socialPlatform && formData.socialPlatform == "Select" ) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Select social platforms to distribute your music to."
            })

            setError("socialPlatform", { message: "Select social platforms to distribute your music to." })
            return;
        }

        const formDetails: albumRelease3Interface = {
            release_id: albumRelease._id || '',

            stores: selectStores,
            socialPlatforms: selectSocialStores
        };

        _handleSetAlbumRelease3(formDetails);


        try {
            const response = (await axios.patch(
                `${apiEndpoint}/releases/album/create-update-3`,
                formDetails,
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;

            if (response.status) {
                _handleSetAlbumRelease3(response.result);
                navigate("/account/create-album-release-song-upload");
            }
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, failed to save details. please try again.";
            // console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }



    return {
        navigate,
        apiResponse,
        setApiResponse,
        
        register, setValue,
        errors, isValid, isSubmitting,
        
        selectStores, setSelectStores,
        selectSocialStores, setSelectSocialStores,

        handleStoreSelect,
        handleSocialStoreSelect,

        submitForm: handleSubmit(onSubmit)
    }
}