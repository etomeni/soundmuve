import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { contentWidth } from '@/util/mui';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import colors from '@/constants/colors';



function PrivacyPolicy() {


    return (
        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                mt: { xs: "35px", md: "75px"}
            }}>
                <Typography sx={{
                    fontFamily: "Nohemi",
                    fontWeight: "bold",
                    fontSize: {xs: "35px", md: "60px"},
                    lineHeight: {xs: "", md: "82.28px"},
                    letterSpacing: {xs: "1px", md: "-1.5px"},
                    textAlign: "center",
                    mt: {xs: "18px", md: "25px"},
                    color: colors.dark
                }}> PRIVACY POLICY </Typography>

                <Box sx={{
                    my: 4, 
                    textAlign: "justify",
                    fontSize: 20
                }}>
                    <Typography variant='body1' component="p"
                        sx={{
                            pb: 4,
                            fontFamily: "Geist",
                            fontWeight: "300",
                            fontSize: { xs: "13px", md: "20px" },
                            lineHeight: {xs: "28px", md: "40px" },
                            letterSpacing: {xs: "-0.13px", md: "-0.129px" },
                            textAlign: "justified"
                        }}
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                    </Typography>
                    
                    <Typography variant='body1' component="p"
                        sx={{
                            pb: 4,
                            fontFamily: "Geist",
                            fontWeight: "300",
                            fontSize: { xs: "13px", md: "20px" },
                            lineHeight: {xs: "28px", md: "40px" },
                            letterSpacing: {xs: "-0.13px", md: "-0.129px" },
                            textAlign: "justified"
                        }}
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                    </Typography>
                </Box>
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default PrivacyPolicy;
