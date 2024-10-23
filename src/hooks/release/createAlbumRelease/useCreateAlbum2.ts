import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { albumRelease2Interface } from '@/typeInterfaces/release.interface';
import { albumRelease2FormSchema } from '../releaseFormSchema';
import { apiEndpoint } from '@/util/resources';
import { restCountries } from '@/util/countries';


const contriesss = restCountries.map(item => item.name.common);
contriesss.unshift("All");

export function useCreateAlbum2() {
    const navigate = useNavigate();

    const accessToken = useUserStore((state) => state.accessToken);
    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);
    const _handleSetAlbumRelease2 = useCreateReleaseStore((state) => state._handleSetAlbumRelease2);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

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
            const response = (await axios.patch(
                `${apiEndpoint}/releases/album/create-update-2`,
                formDetails,
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;

            if (response.status) {
                _handleSetAlbumRelease2(response.result);
                navigate("/account/create-album-release-select-stores");
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
        
        soldWorldwide, setSoldWorldwide,
        selectSoldCountries, setSelectSoldCountries,
        handleSoldCountriesSelect,

        submitForm: handleSubmit(onSubmit)
    }
}
