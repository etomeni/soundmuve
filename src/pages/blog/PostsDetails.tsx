import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FooterComponent from '@/components/Footer';
import HeaderComponent from '@/components/Header';

import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';
import { useBlogHook } from '@/hooks/blog/useBlogHook';
import featuredImagePlaceHolder from "@/assets/images/featuredImagePlaceHolder.jpg";
import LoadingDataComponent from '@/components/LoadingData';


function PostsDetails() {
    const navigate = useNavigate();
    const {post_slug} = useParams();

    const {
        getPostById,
        postDetails,
    } = useBlogHook();
    
    useEffect(() => {
        if (post_slug) {
            getPostById(post_slug);
        } else {
            navigate(-1);
        }
    }, [post_slug]);


    
    return (
        <Box bgcolor={colors.bg}>
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                my: { xs: "35px", md: "75px"},
                px: {xs: 1, sm: 5, md: 10},
                // mb: {xs: 5, md: 10},
            }}>
                {
                    postDetails ?
                        <Box>
                            <Typography variant='h2'
                                sx={{
                                    fontFamily: 'Nohemi',
                                    fontWeight: {xs: "600", md: "700"},
                                    fontSize: {xs: "20px", sm: "30px", md: "40px"},
                                    // lineHeight: "20px",
                                    textAlign: "center",
                                    color: colors.dark,
                                    mb: 1,
                                }}
                            >{ postDetails.title }</Typography>

                            <Box
                                sx={{
                                    bgcolor: colors.secondary,
                                    borderRadius: "24px",
                                    p: "16px",
                                }}
                            >
                                <Box
                                    sx={{
                                        border: "1px solid #000000",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        maxHeight: {xs: "235px", md: "300px"},
                                    }}
                                >
                                    <img src={postDetails.featuredImage || featuredImagePlaceHolder} alt='blog post image'
                                        style={{
                                            width: "100%",
                                            // height: "100%",
                                            maxHeight: "300px",
                                            objectFit: "contain",
                                            backgroundColor: colors.tertiary,
                                            // objectPosition: "top", // Aligns the image to the top
                                            display: "block", // Remove any default inline spacing
                                        }}
                                    />
                                </Box>

                                <Box>
                                    {/* <Typography variant='subtitle1'
                                        sx={{
                                            fontFamily: 'Nohemi',
                                            fontWeight: "600",
                                            fontSize: "20px",
                                            // lineHeight: "20px",
                                            color: colors.dark,
                                            mt: 1, mb: 0.5
                                        }}
                                    >How do lovers grow?</Typography> */}

                                    <Typography variant='body1'
                                        sx={{
                                            fontFamily: 'Inter',
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            // lineHeight: "16px",
                                            color: colors.dark,
                                        }}
                                        dangerouslySetInnerHTML={{ __html: postDetails.content }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    : <LoadingDataComponent />
                }
      
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default PostsDetails;