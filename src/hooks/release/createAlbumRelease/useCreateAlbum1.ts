import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSettingStore } from '@/state/settingStore';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { albumRelease1Interface, artistInterface } from '@/typeInterfaces/release.interface';
import { albumRelease1FormSchema } from '../releaseFormSchema';
import { getQueryParams } from '@/util/resources';
import { useGetReleases } from '../useGetReleases';
import apiClient, { apiErrorResponse } from '@/util/apiClient';


export function useCreateAlbum1() {
    const navigate = useNavigate();
    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);

    const recordLabelArtist_id: string = getQueryParams('recordLabelArtist_id');
    const release_id: string = albumRelease._id || getQueryParams('release_id');

    const _handleSetAlbumRelease1 = useCreateReleaseStore((state) => state._handleSetAlbumRelease1);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const [language, setLanguage] = useState('Select Language');
    const [selectPrimaryGenre, setSelectPrimaryGenre] = useState('Select Primary Genre');
    const [selectSecondaryGenre, setSelectSecondaryGenre] = useState('Select Secondary Genre');
    const [selectReleaseDateValue, setSelectReleaseDateValue] = useState<any>('');
    const [spotifyReleaseTimezone, setSpotifyReleaseTimezone] = useState<"listener's timezone" | "EST/NYC timezone">("listener's timezone");
    
    const [openSearchArtistModal, setOpenSearchArtistModal] = useState(false);
    const [selectedSpotifyArtist, setSelectedSpotifyArtist] = useState<artistInterface>();

    const _handleSetAlbumRelease = useCreateReleaseStore((state) => state._handleSetAlbumRelease2);
    const { releaseDetails, getReleaseById } = useGetReleases();


    const { 
        handleSubmit, register, setValue, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(albumRelease1FormSchema),
        mode: 'onBlur',
        defaultValues: { 
            language: albumRelease.language || "Select Language",
            primaryGenre: albumRelease.primaryGenre || "Select Primary Genre",
            secondaryGenre: albumRelease.secondaryGenre || "Select Secondary Genre",
            // explicitSongLyrics: explicitLyrics,
            releaseTimeHours: albumRelease.spotifyReleaseTime.hours || "12",
            releaseTimeMinutes: albumRelease.spotifyReleaseTime.hours || "00",
            releaseTimeHourFormat: albumRelease.spotifyReleaseTime.am_pm || "AM",
        } 
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
        if (albumRelease.title) {
            setValue(
                "albumTitle", albumRelease.title,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (albumRelease.mainArtist.spotifyProfile.name) {
            setSelectedSpotifyArtist(albumRelease.mainArtist.spotifyProfile);
            setValue(
                "spotifyArtistProfile", 
                albumRelease.mainArtist.spotifyProfile.name,
                {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
            );
        }

        if (albumRelease.mainArtist.appleMusicProfile) {
            setValue(
                "appleMusicUrl", albumRelease.mainArtist.appleMusicProfile,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (albumRelease.language) {
            setValue(
                "language", albumRelease.language,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            setLanguage(albumRelease.language);
        }

        if (albumRelease.primaryGenre) {
            setValue(
                "primaryGenre", albumRelease.primaryGenre,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSelectPrimaryGenre(albumRelease.primaryGenre)
        }

        if (albumRelease.secondaryGenre) {
            setValue(
                "secondaryGenre", albumRelease.secondaryGenre,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSelectSecondaryGenre(albumRelease.secondaryGenre);
        }
        
        if (albumRelease.releaseDate) {
            setValue(
                "releaseDate", albumRelease.releaseDate,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
            setSelectReleaseDateValue(albumRelease.releaseDate);
        }

        if (albumRelease.spotifyReleaseTime.hours) {
            setValue(
                "releaseTimeHours", albumRelease.spotifyReleaseTime.hours,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (albumRelease.spotifyReleaseTime.minutes) {
            setValue(
                "releaseTimeMinutes", albumRelease.spotifyReleaseTime.minutes,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (albumRelease.spotifyReleaseTime.am_pm) {
            setValue(
                "releaseTimeHourFormat", albumRelease.spotifyReleaseTime.am_pm,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (albumRelease.spotifyReleaseTimezone) {
            const anyValue: any = albumRelease.spotifyReleaseTimezone;
            setSpotifyReleaseTimezone(anyValue)
        }
    }


    const handleSetArtistName = useCallback((details: artistInterface, dspName: "Spotify" | "Apple") => {
        // console.log(details);
        if (dspName == "Spotify") {
            setSelectedSpotifyArtist(details);
            setValue(
                "spotifyArtistProfile", 
                details.name,
                {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
            );
        } else if (dspName == "Apple") {
            
        }

    }, []);
            

    const onSubmit = async (formData: typeof albumRelease1FormSchema.__outputType) => {
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

            setError(
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

            setError("language", {message: "Please select a language."}, {shouldFocus: true});
            return;
        }

        if (formData.primaryGenre == "Select Primary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select primary genre."
            })

            setError("primaryGenre", {message: "Please select primary genre."}, {shouldFocus: true});
            return;
        }

        if (formData.secondaryGenre == "Select Secondary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select secondary genre."
            })

            setError("secondaryGenre", {message: "Please select secondary genre."}, {shouldFocus: true});
            return;
        }

        if (!formData.releaseDate) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a release date."
            })

            setError("releaseDate", { message: "Please select a release date." }, {shouldFocus: true});
            return;
        }

        const formDetails: albumRelease1Interface = {
            release_id: release_id,
            recordLabelArtist_id: recordLabelArtist_id,

            title: formData.albumTitle,
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
            spotifyReleaseTimezone: spotifyReleaseTimezone
        };

        _handleSetAlbumRelease1(formDetails);


        try {
            const response = (await apiClient.put(
                `/releases/album/create-1`,
                formDetails,
            )).data;

            // console.log(response);

            if (response.status) {
                _handleSetAlbumRelease1(response.result);
                navigate({
                    pathname: "/account/create-album-release-advance-features",
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

        language, setLanguage,
        selectPrimaryGenre, setSelectPrimaryGenre,
        selectSecondaryGenre, setSelectSecondaryGenre,

        selectReleaseDateValue, setSelectReleaseDateValue,
        spotifyReleaseTimezone, setSpotifyReleaseTimezone,
        selectedSpotifyArtist,
        openSearchArtistModal, setOpenSearchArtistModal,

        register, setValue,
        errors, isValid, isSubmitting,

        handleSetArtistName,

        submitForm: handleSubmit(onSubmit)
    }
}
