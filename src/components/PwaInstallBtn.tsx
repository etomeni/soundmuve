import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import pwaBanner from "@/assets/branded/images/pwaBanner.png";


declare global {
    interface BeforeInstallPromptEvent extends Event {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    }
}

const InstallPWAButton: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent);
            setShowButton(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', () => setShowButton(false));

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('PWA installation accepted');
            }
            setDeferredPrompt(null);
            setShowButton(false);
        }
    };

    if (!showButton) return null;

    return (
        <Box onClick={handleInstallClick} 
            sx={{
                cursor: 'pointer',
                maxWidth: {xs: "100px", sm: "125px", md: "140px", lg: "150px"}
            }}
        >
            <img src={pwaBanner} alt='pwa download banner' 
                style={{
                    objectFit: "contain",
                    width: "100%",
                    display: "block"
                }}
            />
        </Box>
    );
};

export default InstallPWAButton;
