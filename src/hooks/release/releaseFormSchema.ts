import * as yup from "yup";

export const singleRelease1FormSchema = yup.object({
    songTitle: yup.string().required().trim().label("Song Title"),
    appleMusicUrl: yup.string().required().trim().label("Apple Music Profile Link"),
    spotifyArtistProfile: yup.string().required().trim().label("Spotify Profile"),

    language: yup.string().required().trim().label("Language"),
    primaryGenre: yup.string().required().trim().label("Primary Genre"),
    secondaryGenre: yup.string().required().trim().label("Secondary Genre"),
    releaseDate: yup.string().trim().label("Release Date"),
    
    releaseTimeHours: yup.string().trim().label("Hours"),
    releaseTimeMinutes: yup.string().trim().label("Minutes"),
    releaseTimeHourFormat: yup.string().trim().label("Time Format"),

    labelName: yup.string().trim().label("Label Name"),
    recordingLocation: yup.string().trim().label("Recording Location"),
    soldWorldwide: yup.string().trim(),
    UPC_EANcode: yup.string().trim().label("UPC/EAN Code"),
});

export const singleRelease2FormSchema = yup.object({
    artistCreativeName: yup.string().trim().label("Artist/Creative Name"),
    songArtistsCreativeRole: yup.string().trim().label("Artist/Creative Role"),
    ISRC_Number: yup.string().trim().label("ISRC Number"),
    songWriter: yup.string().trim().label("Song Writer"),
    store: yup.string().trim().label("Store"),
    socialPlatform: yup.string().trim().label("Social Platform"),

    explicitSongLyrics: yup.string().trim(),


    copyrightOwnership: yup.string().trim().label("Copyright Ownership"),
    copyrightOwnershipPermission: yup.string().trim().label("Copyright Ownership Permission"),

    songLyrics: yup.string().trim(),
    lyricsLanguage: yup.string().trim().label("Lyrics Language"),
    tikTokClipStartTime_Minutes: yup.string().trim().label("TikTok Clip Start Time"),
    tikTokClipStartTime_Seconds: yup.string().trim().label("TikTok Clip Start Time"),
});
