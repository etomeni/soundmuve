import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RWebShare } from "react-web-share";

import colors from '@/constants/colors';
import { numberOfLinesTypographyStyle } from '@/util/mui';

interface _Props {
    // children: React.ReactNode,
    linkUrl: string
}


const CopyShareLink: React.FC<_Props> = ({
    linkUrl
}) => {

    return (
        <Box>
            <Stack direction={"row"} 
                justifyContent={"space-between"} 
                spacing={{xs: "3px", md: "10px"}} alignItems={"center"}
                sx={{
                    padding: {xs: "6.162px 11.091px", md: "10px 18px"},
                    borderRadius: {xs: "6.162px", md: "8px"},
                    bgcolor: colors.tertiary,
                    color: colors.milk,
                }}
            >
                <Typography variant='body1'
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        color: colors.milk,
                        fontSize: {xs: "13px", md: "20px"},
                        fontWeight: "700",
                        lineHeight: {xs: "14.788px", md: "24px"},
                        letterSpacing: {xs: "0.209px", md: "-0.34px"},
                        overflow: "hidden",
                        maxWidth: {xs: "150px", md: "200px"}
                    }}
                >{linkUrl}</Typography>

                <CopyToClipboard text={linkUrl} onCopy={() => {}}>
                    <IconButton>
                        <ContentCopyOutlinedIcon sx={{ color: colors.milk, fontSize: {xs: "13px", md: "18px"} }} />
                    </IconButton>
                </CopyToClipboard>

                
                <RWebShare
                    data={{
                        text: linkUrl,
                        url: linkUrl,
                        title: "Soundmuve",
                    }}
                    onClick={() =>
                        console.log("shared successfully!")
                    }
                >
                    <IconButton>
                        <IosShareOutlinedIcon sx={{ color: colors.milk, fontSize: {xs: "13px", md: '18px'} }} />
                    </IconButton>
                </RWebShare>
            </Stack>
        </Box>
    )
}

export default CopyShareLink;