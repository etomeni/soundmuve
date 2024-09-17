import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
// import animatedGif from "@/assets/branded/images/animation.gif";
import animatedVid from "@/assets/branded/images/home/animationVid.mp4";
// import animatedVid_mobile from "@/assets/branded/images/home/animationVid_mobile.mp4";
import cssStyle from '@/components/home/homeStyle.module.css';
// import { contentWidth } from '@/util/mui';


interface _Props {
    // children: React.ReactNode,
    // songTitle: string,
    // artistName: string,
}

const AnimatedSection: React.FC<_Props> = ({
}) => {
    // Create a ref for the video element
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // State to track if the video has already been played
    const [hasPlayed, setHasPlayed] = useState(false);


    useEffect(() => {
        const handlePlayVideo = (entries: IntersectionObserverEntry[]) => {
            const video = videoRef.current;
            entries.forEach((entry) => {
                // if (video) {
                //     if (entry.isIntersecting) {
                //         video.play(); // Play video when in view
                //     } else {
                //         video.pause(); // Pause video when out of view
                //     }
                // }

                if (video && entry.isIntersecting && !hasPlayed) {
                    video.play();  // Play video when it first comes into view
                    setHasPlayed(true);  // Mark as played to prevent replay
                }
            });
        };
    
        const observer = new IntersectionObserver(handlePlayVideo, {
            threshold: 0.5, // Play when 50% of the video is in view
        });
    
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
    
        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [hasPlayed]);


    return (
        <Box
            sx={{
                height: {xs: "400px", sm: "500px", md: "600px", lg: "720px"},
                // ...contentWidth,
                // width: {xs: "100%", sm: "calc(100% - 50px)", md: "calc(100% - 140px)" },
                width: "100%",

                maxWidth: "1600px",
                // bgcolor: colors.secondary,

                position: "absolute",
                // bottom: {xs: "-15%", sm: "-25%", md: "-20%"},
                bottom: {xs: "-13%", sm: "-31%", md: "-24%", lg: "-37%"},
                // bottom: {xs: "0%", md: "0%"},
                // bottom: {xs: "0%", sm: "-15%", md: "-20%", lg: "-25%"},
                left: 0,
                right: 0,
                marginInline: "auto",

                // backgroundImage: `url(${animatedGif})`,
                // backgroundSize: "cover",
                // backgroundPosition: "bottom center",
                // backgroundRepeat: "no-repeat",
            }}
        >
            <video muted 
                ref={videoRef}
                playsInline 
                // autoPlay
                preload="auto" // Preload the video
                // poster="path-to-your-poster-image.jpg"  // Set poster image
            
                className={cssStyle.backgroundVideo}
            >
                <source src={animatedVid} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Box>

    )
}

export default AnimatedSection;
