import { useSettingStore } from '../state/settingStore';
import SoundMuve from "./../assets/images/SoundMuve.png";
import bgStyles from './../util/bgStyles.module.css';

export default function LoadingComponent() {
    const darkTheme = useSettingStore((state) => state.darkTheme);

    return (
        <main 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: darkTheme ? "#000" : "#ffff",
                // overflow: "hidden"
            }}
        >
            { darkTheme && 
                <>
                    <section className={`${bgStyles.defaultDisplay} ${bgStyles.mdzz}`}>
                        <div className={bgStyles.topGradient}></div>
                        <div className={bgStyles.leftGradient}></div>
                        {/* <div className={bgStyles.leftBottomGradient}></div> */}
                        <div className={bgStyles.rightTopGradient}></div>
                        {/* <div className={bgStyles.rightBottom2Gradient}></div> */}
                        <div className={bgStyles.btnCenteredGradient}></div>
                        {/* <div className={bgStyles.leftBottom2Gradient}></div> */}
                    </section>

                    <section className={`${bgStyles.defaultDisplay} ${bgStyles.xszz}`}>
                        <div className={bgStyles.mobileLeftGradient}></div>
                        <div className={bgStyles.mobileRightGradientLoading}></div>
                        {/* <div className={bgStyles.mobileCenteredGradient}></div> */}
                    </section>
                </>
            }

            <div className="breathing-image">
                <img src={SoundMuve} alt="soundmuve icon" style={{width: 130}} />
                <style>
                    {`
                        .breathing-image {
                            animation: breathe ${2}s ease-in-out infinite;
                        }

                        @keyframes breathe {
                            0% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(${0.7});
                            }
                            100% {
                                transform: scale(1);
                            }
                        }
                    `}
                </style>
            </div>
        </main>
    );
}