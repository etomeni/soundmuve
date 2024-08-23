// import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';


interface MyComponentProps {
    artistTestimonies: {
        img: string,
        title: string,
        author: string,
    }
};
    

const ArtistTestimony: React.FC<MyComponentProps> = ({artistTestimonies}) => {

    return (
        <Box sx={{
            borderRadius: "13px",
            overflow: "hidden",
        }}>
            <ImageList sx={{overflow: "hidden", height: "307px", m: 0}}>
                <ImageListItem sx={{ width: "260px", height: "307px", borderRadius: "13px", overflow: "hidden", }}>
                    <img
                        srcSet={`${artistTestimonies.img} 2x`}
                        src={`${artistTestimonies.img}`}
                        alt={`${artistTestimonies.title} image`}
                        loading="lazy"
                        style={{
                            width: "100%", maxWidth: "260px",
                            height: "100%", maxHeight: "307px", 
                            objectFit: "cover"
                        }}
                    />
                    <ImageListItemBar
                        title={artistTestimonies.title}
                        // subtitle={artistTestimonies.author}
                        // sx={{ width: "232px", }}
                        // actionIcon={
                        //     <IconButton
                        //         sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        //         aria-label={`info about ${artistTestimonies.title}`}
                        //     >
                        //         <InfoIcon />
                        //     </IconButton>
                        // }
                    />
                </ImageListItem>
            </ImageList>
        </Box>

    );
}

export default ArtistTestimony;

