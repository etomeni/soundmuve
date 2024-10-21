import { useState } from "react";
// import axios from "axios";
// import { useUserStore } from "@/state/userStore";
// import { emekaApiEndpoint, localApiEndpoint } from "@/util/resources";
// import { getLocalStorage, setLocalStorage } from "@/util/storage";
// import { releaseInterface } from "@/typeInterfaces/release.interface";


export function useCreateAlbumRelease() {
    // const accessToken = useUserStore((state) => state.accessToken);
    // const [releases, setReleases] = useState<releaseInterface[]>(getLocalSingleRelease);


    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    

    return {
        apiResponse,
        setApiResponse,

    }
}



