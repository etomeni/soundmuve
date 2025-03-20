import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import colors from '@/constants/colors';
import featuredImagePlaceHolder from "@/assets/images/featuredImagePlaceHolder.jpg";
import { numberOfLinesTypographyStyle } from '@/util/mui';
import { blogInterface } from '@/typeInterfaces/blog.interface';


interface myProps {
    post: blogInterface;
};

const PostItemComponent: React.FC<myProps> = ({ post }) => {

    return (
        <Box
            sx={{
                bgcolor: colors.secondary,
                borderRadius: "24px",
                p: "16px",
            }}
        >
            <Link to={`/blog/${post.slug}`}>
                <Box
                    sx={{
                        border: "1px solid #000000",
                        borderRadius: "16px",
                        overflow: "hidden",
                    }}
                >
                    <img src={post.featuredImage || featuredImagePlaceHolder} alt='blog post image'
                        style={{
                            width: "100%",
                            maxHeight: "280px",
                            objectFit: "cover",
                            objectPosition: "top", // Aligns the image to the top
                            display: "block", // Remove any default inline spacing
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant='subtitle1'
                        sx={{
                            fontFamily: 'Nohemi',
                            fontWeight: "600",
                            fontSize: "20px",
                            // lineHeight: "20px",
                            color: colors.dark,
                            mt: 1, mb: 0.5,
                            ...numberOfLinesTypographyStyle(2)
                        }}
                    >{ post.title }</Typography>

                    <Typography variant='body1'
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: "500",
                            fontSize: "14px",
                            // lineHeight: "16px",
                            color: "#595757",
                            ...numberOfLinesTypographyStyle(5)
                        }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </Box>
            </Link>
        </Box>
    );
}

export default PostItemComponent;

