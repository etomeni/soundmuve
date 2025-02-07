import { useCallback, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from 'react-router-dom';

import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { getQueryParams, apiEndpoint } from "@/util/resources";
import { artistInterface, singleRelease1Interface } from "@/typeInterfaces/release.interface";
import { singleRelease1FormSchema } from "../releaseFormSchema";
import { restCountries } from "@/util/countries";
import { useSettingStore } from "@/state/settingStore";
import { useCreateReleaseStore } from "@/state/createReleaseStore";


const contriesss = restCountries.map(item => item.name.common);
contriesss.unshift("All");

export function useCreateSingleRelease1() {
    const navigate = useNavigate();
    const singleRelease = useCreateReleaseStore((state) => state.singleRelease);

    const release_id: string = singleRelease._id || getQueryParams('release_id');
    const recordLabelArtist_id: string = getQueryParams('recordLabelArtist_id');
    
    const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const _handleSetSingleRelease1 = useCreateReleaseStore((state) => state._handleSetSingleRelease1);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [language, setLanguage] = useState('Select Language');
    const [selectPrimaryGenre, setSelectPrimaryGenre] = useState('Select Primary Genre');
    const [selectSecondaryGenre, setSelectSecondaryGenre] = useState('Select Secondary Genre');

    const [soldWorldwide, setSoldWorldwide] = useState(""); // Yes
    const [selectReleaseDateValue, setSelectReleaseDateValue] = useState<any>('');
    const [spotifyReleaseTimezone, setSpotifyReleaseTimezone] = useState<"listener's timezone" | "EST/NYC timezone">("listener's timezone");
    const [openSearchArtistModal, setOpenSearchArtistModal] = useState(false);
    const [selectedSpotifyArtist, setSelectedSpotifyArtist] = useState<artistInterface>();
    const [selectSoldCountries, setSelectSoldCountries] = useState<string[]>(contriesss);
    

    const singleRelease1Form = useForm({ 
        resolver: yupResolver(singleRelease1FormSchema),
        mode: 'onBlur',
        defaultValues: { 
            soldWorldwide: soldWorldwide,
            releaseTimeHours: "12",
            releaseTimeMinutes: "00",
            releaseTimeHourFormat: "AM",

            language: "Select Language",
            primaryGenre: "Select Primary Genre",
            secondaryGenre: "Select Secondary Genre",
        } 
    });

    const handleSetArtistName = useCallback((details: artistInterface, dspName: "Spotify" | "Apple") => {
        // console.log(details);
        if (dspName == "Spotify") {
            setSelectedSpotifyArtist(details);
            singleRelease1Form.setValue(
                "spotifyArtistProfile", 
                details.name,
                {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
            );
        } else if (dspName == "Apple") {
            
        }

    }, []);

    const handleSoldCountriesSelect = useCallback((selected: string[]) => {
        setSelectSoldCountries(selected);
        singleRelease1Form.setValue("soldWorldwide", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }, []);

    
    const submitCreateSingleRelease1 = async (formData: typeof singleRelease1FormSchema.__outputType) => {
        // console.log(formData);
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (!formData.spotifyArtistProfile || !selectedSpotifyArtist) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Spotify artist profile name required."
            })

            singleRelease1Form.setError(
                "spotifyArtistProfile", 
                {message: "Spotify artist profile name required."}, 
                {shouldFocus: true}
            );
            return;
        }


        if (formData.language == "Select Language") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a language."
            })

            singleRelease1Form.setError("language", {message: "Please select a language."}, {shouldFocus: true});
            return;
        }

        if (formData.primaryGenre == "Select Primary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select primary genre."
            })

            singleRelease1Form.setError("primaryGenre", {message: "Please select primary genre."}, {shouldFocus: true});
            return;
        }

        if (formData.secondaryGenre == "Select Secondary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select secondary genre."
            })

            singleRelease1Form.setError("secondaryGenre", {message: "Please select secondary genre."}, {shouldFocus: true});
            return;
        }

        if (!formData.releaseDate) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a release date."
            })

            singleRelease1Form.setError("releaseDate", { message: "Please select a release date." }, {shouldFocus: true});

            // document.getElementById("releaseDate")?.focus();
            return;
        }

        if (!soldWorldwide) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select if this release can be sold worldwide?"
            });

            singleRelease1Form.setError("soldWorldwide", {message: "Please select if this release can be sold worldwide?"})
            return;
        }
        
        const data2submit: singleRelease1Interface = {
            release_id: release_id, // optional, only add it when you've created the release and want to edit it.
            recordLabelArtist_id: recordLabelArtist_id,
            
            title: formData.songTitle,
        
            mainArtist: {
                spotifyProfile: selectedSpotifyArtist,
                appleMusicProfile: formData.appleMusicUrl
            },

            language: formData.language,
            primaryGenre: formData.primaryGenre,
            secondaryGenre: formData.secondaryGenre,
        
            releaseDate: formData.releaseDate,
            spotifyReleaseTime: {
                hours: formData.releaseTimeHours || '',
                minutes: formData.releaseTimeMinutes || '',
                am_pm: formData.releaseTimeHourFormat || ''  // "AM" | "PM"
            },
            spotifyReleaseTimezone: spotifyReleaseTimezone,
        
            labelName: formData.labelName || '', // optional
            recordingLocation: formData.recordingLocation || '', // optional 
        
            soldCountries: {
                worldwide: formData.soldWorldwide || soldWorldwide, // "Yes" | "No",
                countries: soldWorldwide == "Yes" ? [] : selectSoldCountries, // optional if worldwide is Yes
            },
        
            upc_ean: formData.UPC_EANcode || '' // optional
        }
        // console.log(data2submit);

        _handleSetSingleRelease1(data2submit);

        try {
            const response = (await axios.put(
                `${apiEndpoint}/releases/single/create`,
                data2submit,  
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            // console.log(response);

            if (response.status) {
                _handleSetSingleRelease1(response.result);
                
                _setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });
    
                navigate({
                    pathname: "/account/create-single-release-continue",
                    search: `?${createSearchParams({release_id: response.result._id })}`,
                });

                // navigate("/account/create-single-release-continue");
                return
            }

            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
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

    };


    useEffect(() => {
        restoreValues()
    }, [singleRelease]);
    

    const restoreValues = () => {
        if (singleRelease.title) {
            singleRelease1Form.setValue(
                "songTitle", singleRelease.title,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.mainArtist && singleRelease.mainArtist.spotifyProfile && singleRelease.mainArtist.spotifyProfile.name) {
            setSelectedSpotifyArtist(singleRelease.mainArtist.spotifyProfile);
            singleRelease1Form.setValue(
                "spotifyArtistProfile", 
                singleRelease.mainArtist.spotifyProfile.name,
                {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
            );
        }

        if (singleRelease.mainArtist.appleMusicProfile) {
            singleRelease1Form.setValue(
                "appleMusicUrl", singleRelease.mainArtist.appleMusicProfile,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.language) {
            singleRelease1Form.setValue(
                "language", singleRelease.language,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            setLanguage(singleRelease.language);
        }

        if (singleRelease.primaryGenre) {
            singleRelease1Form.setValue(
                "primaryGenre", singleRelease.primaryGenre,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSelectPrimaryGenre(singleRelease.primaryGenre)
        }

        if (singleRelease.secondaryGenre) {
            singleRelease1Form.setValue(
                "secondaryGenre", singleRelease.secondaryGenre,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSelectSecondaryGenre(singleRelease.secondaryGenre);
        }
        
        if (singleRelease.releaseDate) {
            singleRelease1Form.setValue(
                "releaseDate", singleRelease.releaseDate,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSelectReleaseDateValue(singleRelease.releaseDate);
        }

        if (singleRelease.spotifyReleaseTime.hours) {
            singleRelease1Form.setValue(
                "releaseTimeHours", singleRelease.spotifyReleaseTime.hours,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.spotifyReleaseTime.minutes) {
            singleRelease1Form.setValue(
                "releaseTimeMinutes", singleRelease.spotifyReleaseTime.minutes,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.spotifyReleaseTime.am_pm) {
            singleRelease1Form.setValue(
                "releaseTimeHourFormat", singleRelease.spotifyReleaseTime.am_pm,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.spotifyReleaseTimezone) {
            const anyValue: any = singleRelease.spotifyReleaseTimezone;
            setSpotifyReleaseTimezone(anyValue)
        }


        if (singleRelease.labelName) {
            singleRelease1Form.setValue(
                "labelName", singleRelease.labelName,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.recordingLocation) {
            singleRelease1Form.setValue(
                "recordingLocation", singleRelease.recordingLocation,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (singleRelease.soldCountries.worldwide) {
            singleRelease1Form.setValue(
                "soldWorldwide", singleRelease.soldCountries.worldwide,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSoldWorldwide(singleRelease.soldCountries.worldwide);
        }

        if (singleRelease.soldCountries.countries) {
            setSelectSoldCountries(singleRelease.soldCountries.countries)
        }

        if (singleRelease.upc_ean) {
            singleRelease1Form.setValue(
                "UPC_EANcode", singleRelease.upc_ean,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
    }

    
    const returnSingleRelease1 = {
        selectReleaseDateValue, setSelectReleaseDateValue,

        spotifyReleaseTimezone, setSpotifyReleaseTimezone,

        language, setLanguage,
        selectPrimaryGenre, setSelectPrimaryGenre,
        selectSecondaryGenre, setSelectSecondaryGenre,

        soldWorldwide, setSoldWorldwide,
        selectSoldCountries,

        selectedSpotifyArtist,


        singleRelease,
        singleRelease1Form,

        openSearchArtistModal, setOpenSearchArtistModal,

        onSubmitCreateSingleRelease1: singleRelease1Form.handleSubmit(submitCreateSingleRelease1),

        handleSetArtistName,
        handleSoldCountriesSelect,
    }


    return {
        apiResponse, setApiResponse,
        navigate,

        ...returnSingleRelease1,
    }
}
