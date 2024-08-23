// import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


function PromotionalAdsComponent() {
    const theme = useTheme();
    const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    const handleExternalUrl = (url: string) => {
        if (!url) return;
        
        window.open(
            url,
            '_self', 
            'noopener,noreferrer'
        ) 
    };


    const adverts = [
        {
            url: "https://gsssecurity.ng/",
            xsImage: "https://placehold.co/369x160?text=Promotional+Ads",
            smImage: "https://placehold.co/600x200?text=Promotional+Ads",
            mdImage: 'https://placehold.co/890x215?text=Promotional+Ads'
        },
        {
            url: "/account/record-label/add-artist",
            xsImage: "https://placehold.co/369x160?text=Promotional+Ads",
            smImage: "https://placehold.co/600x200?text=Promotional+Ads",
            mdImage: 'https://placehold.co/890x215?text=Promotional+Ads'
        },
        {
            url: "",
            xsImage: "https://placehold.co/369x160?text=Promotional+Ads",
            smImage: "https://placehold.co/600x200?text=Promotional+Ads",
            mdImage: 'https://placehold.co/890x215?text=Promotional+Ads'
        }
    ]

    const getImageUrl = (data: any) => {
        if (xsMatches) return data.xsImage;
        if (smMatches) return data.smImage;
        if (mdMatches) return data.mdImage;
        return "";
    }

    return (
        <Stack alignItems="center" justifyContent='center'
            sx={{
                width: '100%',
                height: {xs: "160px", md: '215px'},
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
                        <Box onClick={() => handleExternalUrl(item.url)}
                            sx={{
                                height: {xs: "160px", md: '215px'},
                                borderRadius: "21px",
                                overflow: "hidden",
                                cursor: "pointer"
                            }}  
                        >
                            <img src={getImageUrl(item)} alt='promotional Ads' 
                                style={{ 
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }} 
                            />
                        </Box>
                    </SwiperSlide>
                ) }

            </Swiper>
        </Stack>
    )
}

export default PromotionalAdsComponent