import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";
import { emekaApiEndpoint } from "@/util/resources";
import { useUserStore } from "@/state/userStore";
import { useEffect, useState } from "react";

import promotionalImg from "@/assets/branded/images/promotion.png";


interface advertsInterface {
    _id: string;
    promopicUrl: string;
    hyperLink: string;
    createdAt: string;
}

function PromotionalAdsComponent() {
    // const theme = useTheme();
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));
    const accessToken = useUserStore((state) => state.accessToken);

    const [adverts, setAdverts] = useState<advertsInterface[]>([]);

    useEffect(() => {
        getPromotions()
    }, [])
    

    const handleExternalUrl = (url: string) => {
        if (!url) return;
        
        window.open(
            url,
            '_self', 
            'noopener,noreferrer'
        ) 
    };


    // const getImageUrl = (data: any) => {
    //     if (xsMatches) return data.xsImage;
    //     if (smMatches) return data.smImage;
    //     if (mdMatches) return data.mdImage;
    //     return "";
    // }


    const getPromotions = async () => {
        try {
            const response = (await axios.get(`${emekaApiEndpoint}/promotions/promotions`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);
            // setAdverts(response.length ? response: []);
            setAdverts([]);
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
        }
    }


    const promotionView = (link: string, imgUrl: string) => (
        <Box onClick={() => handleExternalUrl(link)}
            sx={{
                height: {xs: "160px", md: '215px'},
                borderRadius: "21px",
                overflow: "hidden",
                cursor: link ? "pointer" : "default",
                bgcolor: "#ccc"
            }}  
        >
            <img src={imgUrl} alt='promotional Ads' 
                style={{ 
                    width: "100%",
                    height: "100%",
                    objectFit: "contain" // "cover"
                }} 
            />
        </Box>
    )


    return (
        <Box>
            {
                adverts.length ? (
                    adverts.length == 1 ? (
                        promotionView(adverts[0].hyperLink, adverts[0].promopicUrl)
                    ) : (
                        <Stack alignItems="center" justifyContent='center'
                            sx={{
                                width: '100%',
                                // height: {xs: "160px", md: '215px'},
                                borderRadius: "21px",
                                overflow: "hidden"
                            }}
                        >
                            <Swiper
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                effect='fade'
                                slidesPerView={1.0}
                                pagination={{ 
                                    clickable: true,  
                                    // bulletClass: "promotionalAdsPaginationSlide",
                                    bulletActiveClass: "promotionalAdsActivePaginationSlide",
                                }}
                                scrollbar={{ draggable: true }}
                                loop
                                // speed={500}
                                modules={[EffectFade, Pagination, Autoplay]}
                                style={{
                                    width: '100%',
                                    height: "fit-content"
                                    // height: '215px',
                                    // borderRadius: "21px"
                                }}
                            >
                                
                                { adverts.map((item, i) => 
                                    <SwiperSlide key={i}>
                                        { promotionView(item.hyperLink, item.promopicUrl) }
                                    </SwiperSlide>
                                ) }
                            
                            </Swiper>
                        </Stack>
                    )
                ) : 
                <Box
                    sx={{
                        // height: {xs: "160px", md: '215px'},
                        // borderRadius: "21px",
                        overflow: "hidden",
                        // bgcolor: "#ccc"
                    }}  
                >
                    <img src={promotionalImg} alt='promotional Ads' 
                        style={{ 
                            width: "100%",
                            height: "100%",
                            // borderRadius: "21px",
                            objectFit: "contain" // "cover"
                        }} 
                    />
                </Box>
            }
        </Box>
    );

}

export default PromotionalAdsComponent