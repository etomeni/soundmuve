import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSettingStore } from '@/state/settingStore';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { albumRelease2Interface } from '@/typeInterfaces/release.interface';
import { albumRelease2FormSchema } from '../releaseFormSchema';
import { getQueryParams } from '@/util/resources';
import { restCountries } from '@/util/countries';
import { useGetReleases } from '../useGetReleases';
import apiClient, { apiErrorResponse } from '@/util/apiClient';


const contriesss = restCountries.map(item => item.name.common);
contriesss.unshift("All");

export function useCreateAlbum2() {
    const navigate = useNavigate();

    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);
    const _handleSetAlbumRelease2 = useCreateReleaseStore((state) => state._handleSetAlbumRelease2);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const _handleSetAlbumRelease = useCreateReleaseStore((state) => state._handleSetAlbumRelease2);
    const release_id = albumRelease._id || getQueryParams('release_id')  || '';
    const { releaseDetails, getReleaseById } = useGetReleases();

    const [soldWorldwide, setSoldWorldwide] = useState(""); // Yes
    const [selectSoldCountries, setSelectSoldCountries] = useState<string[]>(contriesss);

    const { 
        handleSubmit, register, setValue, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(albumRelease2FormSchema),
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
        if (albumRelease.labelName) {
            setValue(
                "labelName", albumRelease.labelName,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (albumRelease.recordingLocation) {
            setValue(
                "recordingLocation", albumRelease.recordingLocation,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (albumRelease.soldCountries.worldwide) {
            setValue(
                "soldWorldwide", albumRelease.soldCountries.worldwide,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSoldWorldwide(albumRelease.soldCountries.worldwide);
        }

        if (albumRelease.soldCountries.countries) {
            setSelectSoldCountries(albumRelease.soldCountries.countries)
        }

        if (albumRelease.upc_ean) {
            setValue(
                "UPC_EANcode", albumRelease.upc_ean,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
    }


    const handleSoldCountriesSelect = useCallback((selected: string[]) => {
        setSelectSoldCountries(selected);
        setValue("soldWorldwide", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }, []);

    const onSubmit = async (formData: typeof albumRelease2FormSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (!soldWorldwide) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select if this release can be sold worldwide?"
            });

            setError("soldWorldwide", {message: "Please select if this release can be sold worldwide?"})
            return;
        }
        
        const formDetails: albumRelease2Interface = {
            release_id: albumRelease._id || '',
            labelName: formData.labelName || '', // optional
            recordingLocation: formData.recordingLocation || '', // optional 
        
            soldCountries: {
                worldwide: soldWorldwide, // "Yes" | "No",
                countries: soldWorldwide == "Yes" ? [] : selectSoldCountries, // optional if worldwide is Yes
            },
        
            upc_ean: formData.UPC_EANcode || '' // optional
        };

        _handleSetAlbumRelease2(formDetails);


        try {
            const response = (await apiClient.patch(
                `/releases/album/create-update-2`,
                formDetails,
            )).data;

            if (response.status) {
                _handleSetAlbumRelease2(response.result);

                navigate({
                    pathname: "/account/create-album-release-select-stores",
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
        
        soldWorldwide, setSoldWorldwide,
        selectSoldCountries, setSelectSoldCountries,
        handleSoldCountriesSelect,

        submitForm: handleSubmit(onSubmit)
    }
}
