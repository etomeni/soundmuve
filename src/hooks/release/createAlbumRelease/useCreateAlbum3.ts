import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSettingStore } from '@/state/settingStore';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { albumRelease3Interface } from '@/typeInterfaces/release.interface';
import { albumRelease3FormSchema } from '../releaseFormSchema';
import { getQueryParams } from '@/util/resources';
import { musicStores, socialPlatformStores } from '@/util/resources';
import { useGetReleases } from '../useGetReleases';
import apiClient, { apiErrorResponse } from '@/util/apiClient';


export function useCreateAlbum3() {
    const navigate = useNavigate();

    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);
    const _handleSetAlbumRelease3 = useCreateReleaseStore((state) => state._handleSetAlbumRelease3);

    const [selectStores, setSelectStores] = useState<string[]>(musicStores);
    const [selectSocialStores, setSelectSocialStores] = useState<string[]>(socialPlatformStores);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const _handleSetAlbumRelease = useCreateReleaseStore((state) => state._handleSetAlbumRelease2);
    const release_id = albumRelease._id || getQueryParams('release_id')  || '';
    const { releaseDetails, getReleaseById } = useGetReleases();
    
    const { 
        handleSubmit, register, setValue, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(albumRelease3FormSchema),
        mode: 'onBlur',
    });


    useEffect(() => {
        restoreValues()
    }, [albumRelease]);

    useEffect(() => {
        if (!albumRelease._id) {
            getReleaseById(release_id);
        }
    }, [release_id]);

    useEffect(() => {
        if (releaseDetails) {
            _handleSetAlbumRelease(releaseDetails);
        }
    }, [releaseDetails]);


    const restoreValues = () => {
        if (albumRelease.stores.length) {
            handleStoreSelect(albumRelease.stores);
        }

        if (albumRelease.socialPlatforms.length) {
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
            const response = (await apiClient.patch(
                `/releases/album/create-update-3`,
                formDetails,
            )).data;

            if (response.status) {
                _handleSetAlbumRelease3(response.result);
                navigate({
                    pathname: "/account/create-album-release-song-upload",
                    search: `?${createSearchParams({
                        release_id: albumRelease._id || ''
                    })}`,
                });
            }
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, failed to save details. please try again.");

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }



    return {
        navigate,
        apiResponse,
        setApiResponse,

        albumRelease,
        
        register, setValue,
        errors, isValid, isSubmitting,
        
        selectStores, setSelectStores,
        selectSocialStores, setSelectSocialStores,

        handleStoreSelect,
        handleSocialStoreSelect,

        submitForm: handleSubmit(onSubmit)
    }
}
