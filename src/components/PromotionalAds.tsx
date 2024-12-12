import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { apiEndpoint } from "@/util/resources";
import { useUserStore } from "@/state/userStore";

import { promotionInterface } from "@/typeInterfaces/promotions.interface";
import promotionalImg from "@/assets/branded/images/promotion.png";


function PromotionalAdsComponent() {
    // const theme = useTheme();
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));
    const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);

    const [adverts, setAdverts] = useState<promotionInterface[]>([]);

    useEffect(() => {
        getPromotions()
    }, [])

    // const handleExternalUrl = (url: string) => {
    //     if (!url) return;
        
    //     window.open(
    //         url,
    //         '_self', 
    //         'noopener,noreferrer'
    //     ) 
    // };


    // const getImageUrl = (data: any) => {
    //     if (xsMatches) return data.xsImage;
    //     if (smMatches) return data.smImage;
    //     if (mdMatches) return data.mdImage;
    //     return "";
    // }

    const getPromotions = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/promotions`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;



            if (response.status) {
                const promotions = response.result.filter(
                    (promotion: promotionInterface) => promotion.userType == "All" || promotion.userType == userData.userType
                );
        
                setAdverts(promotions);
            }

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            // const fixedErrorMsg = "Ooops and error occurred!";
            console.error(err);
        }
    }


    const promotionView = (ads: promotionInterface) => (
        <Box // onClick={() => handleExternalUrl(link)}
            sx={{
                // height: {xs: "160px", md: '215px'},
                // borderRadius: "21px",
                overflow: "hidden",
                // cursor: link ? "pointer" : "default",
                // bgcolor: "#ccc"
            }}  
        >
            <img src={ads.image || promotionalImg} alt='promotional Ads' 
                style={{ 
                    width: "100%",
                    height: "100%",
                    // borderRadius: "21px",
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
                        promotionView(adverts[0])
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
                                        { promotionView(item) }
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