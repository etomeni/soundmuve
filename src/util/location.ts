import axios from "axios";

// import { countryInterface, IpApiResponse } from "../constants/modelTypes";


export async function getUserLocation() {
    try {
        const response = (await axios.get("http://ip-api.com/json")).data;
        // const response: IpApiResponse = (await axios.get("http://ip-api.com/json")).data;
    
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getCountries() {
    try {
        const url = "https://restcountries.com/v3.1/all?fields=name,flags,idd";
        // const response: countryInterface[] = (await axios.get(`${url}`)).data;
        const response = (await axios.get(`${url}`)).data;
        // console.log(response);

        response.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        
        return response;
    } catch (error: any) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
        // return [];
    }
}

export async function getUserIP() {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data?.ip;
}
