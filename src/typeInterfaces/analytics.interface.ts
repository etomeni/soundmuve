export type songAnalyticsInterface = {
    // _id: string,
    song_id: string,
    noSold: string,
    revenue: string,
    streamRevenue: string,
    streamPlay: string,

    location: locationAnalyticsInterface[],
}

export type locationAnalyticsInterface = {
    country: string,
    albumSold: number,
    noSold: number,
    streamRevenue: number,
    streamPlay: number,
    revenue: number,
}

export type analyticsInterface = {
    _id: string,
    
    user_id: string,
    user_email: string,

    release_id: string,
    song_id: string,
    date: string, // month and year
    
    albumSold: number,
    noSold: number,
    revenue: number,
    streamRevenue: number,
    streamPlay: number,

    location: locationAnalyticsInterface[],

    status: "Pending" | "Processing" | "Success" | "Complete" | "Failed",

    updatedBy: {
        user_id: string,
        user_email: string,
        name: string
    },

    createdAt: string;
    updatedAt: string;
}


export type salesReportTotalEarningsAnalyticsInterface = {
    totalAlbums: number;
    totalSingles: number;
    albumSold: number;
    noSold: number;
    revenue: number;
    streamRevenue: number;
    streamPlay: number;
}

export type totalEarningsAnalyticsInterface = {
    albumSold: number;
    noSold: number;
    revenue: number;
    streamRevenue: number;
    streamPlay: number;
}


// type shortReleaseInterface = {
//     title: string; 
//     releaseType: string;
//     mainArtist: string; 
//     releaseDate: string; 
//     labelName: string; 
//     coverArt: string; 
// }; 

// export type releaseAnalyticsInterface = analyticsInterface & { release: shortReleaseInterface };



export type albumAndSinglesAnalyticsInterface = {
    release_id: string,
    totalAlbumSold: number,
    totalNoSold: number,
    totalRevenue: number,
    totalStreamRevenue: number,
    totalStreamPlay: number,
    title: string,
    releaseType: string,
    mainArtist: string,
    releaseDate: string,
    labelName: string,
    coverArt: string,
}