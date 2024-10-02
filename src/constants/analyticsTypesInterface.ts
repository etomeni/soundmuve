export type spotifyAndAppleOverviewInterface = {
    apple: {
        revenue: number | string,
        streams: number | string,
        streamTime: number | string
    },
    spotify: {
        revenue: number | string,
        streams: number | string,
        streamTime: number | string
    }
}

export type appleSpotifyRecordInterface = {
    stream: {
        apple: number,
        spotify: number
    },
    revenue: {
        apple: number,
        spotify: number
    },
    _id: string,
    email: string,
    album_name: string,
    album_sold: number,
    created_at: string,
}

export type totalStreamsAndRevenueRecordInterface = {
    _id?: any,
    totalAppleRevenue: number,
    totalSpotifyRevenue: number,
    totalAppleStreams: number,
    totalSpotifyStreams: number
}

export type graphApiRespondInterface = {
    percentageValue: string,
    month: string,
    totalRevenue: string,
    totalAppleRevenue: string
    totalSpotifyRevenue: string
}


export type locationAnalyticsInterface = {
    _id: string,
    email: string,
    location: string,
    album_sold: string,
    single_sold: number,
    streams: number,
    total: number,
    created_at?: string,
}

export type salesReportSingleAnalyticsInterface = {
    title: string,
    songs_sold: number,
    streams: number,
    total_revenue: number,
}

export type salesReportAlbumAnalyticsInterface = {
    album_name: string,
    album_sold: number,
    streams: number,
    total_revenue: number,
}



export type salesReportMainDashInterface = {
    sales_period: string,
    album_sold: number,
    single_sold: number,
    streams: {
        apple: number,
        spotify: number,
        total_combined: number
    },
    total_revenue: number
}