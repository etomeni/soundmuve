import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccountWrapper from '@/components/AccountWrapper';
import colors from '@/constants/colors';
import { useUserStore } from '@/state/userStore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { authMuiTextFieldStyle } from '@/util/mui';
import { useProfileHook } from '@/hooks/profile/useProfileHook';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { restCountries } from '@/util/countries';
import { getCountries } from '@/util/location';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import cloudUpload from "@/assets/images/cloud_upload.png";
import Autocomplete from '@mui/material/Autocomplete';


export default function ProfileEditPage() {
    // const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);
    const [countries, setCountries] = useState(restCountries);
    const [imagePreview, setImagePreview] = useState(userData.recordLabelLogo);
    const [userCountry, setUserCountry] = useState(countries.find((item) => item.name.common == userData.country) || null);

    const { 
        apiResponse,
        isSubmitting, isValid, onSubmit, register, errors, // formSchema,
        setValue,
        // imageRl, 
        setImageRl,
    } = useProfileHook();


    useEffect(() => {
        const sortedCountries = countries.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        setCountries(sortedCountries);


        setValue(
            "artistName", userData.artistName,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "recordLabelName", userData.recordLabelName,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "firstName", userData.firstName,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "lastName", userData.lastName,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "gender", userData.gender,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "phoneNumber", userData.phoneNumber,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "country", userData.country,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );

        getCountries().then((countryRes) => {
            setCountries(countryRes);
        });
    }, []);


    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setImageRl(file);

        const base64: any = await convertToBase64(file);
        // console.log(base64);
        
        setImagePreview(base64);
    
        e.target.value = "";
    }

    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if (!file) {
                // setToastNotification({
                //     display: true,
                //     message: "Please select an image!",
                //     status: "info"
                // })
            } else {
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }
        
    

    return (

        <AccountWrapper>
            <Box >
                <Typography variant='h1' component="h1"
                    sx={{
                        fontFamily: "Nohemi",
                        fontWeight: "900",
                        // fontSize: {xs: "39.96px", md: "60px"},
                        fontSize: {xs: "35px", md: "60px"},
                        lineHeight: {xs: "42.49px", md: "63.8px"},
                        letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                        textAlign: "center"
                    }}
                > Edit Profile Details </Typography>


                <Box maxWidth="500px" mx="auto" my={5}>
                    <form noValidate onSubmit={ onSubmit }> 

                        <Grid container spacing="20px" mb={2}>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            lineHeight: "16px",
                                            color: colors.primary,
                                            mb: 1,
                                        }}
                                    >First Name</Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='firstName'
                                        type='text'
                                        inputMode='text'
                                        defaultValue={userData.firstName}
                                 
                                        sx={{
                                            ...authMuiTextFieldStyle
                                        }}
                                        
                                        error={ errors.firstName ? true : false }
                                        { ...register('firstName') }
                                    />
                                    { errors.firstName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.firstName?.message }</Box> }
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            lineHeight: "16px",
                                            color: colors.primary,
                                            mb: 1,
                                        }}
                                    >Last Name</Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='lastName'
                                        type='text'
                                        inputMode='text'
                                        defaultValue={userData.lastName}
                                 
                                        sx={{
                                            ...authMuiTextFieldStyle
                                        }}
                                        
                                        error={ errors.lastName ? true : false }
                                        { ...register('lastName') }
                                    />
                                    { errors.lastName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.lastName?.message }</Box> }
                                </Box>
                            </Grid>
                        </Grid>


                        <Box mb={2}>
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    color: colors.primary,
                                    mb: 1,
                                }}
                            >Phone number</Typography>

                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                id='phoneNumber'
                                type='text'
                                label=''
                                inputMode='text'
                                defaultValue={userData.phoneNumber}
                                sx={{
                                    ...authMuiTextFieldStyle
                                }}
                                error={ errors.phoneNumber ? true : false }
                                { ...register('phoneNumber') }
                            />
                            { errors.phoneNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.phoneNumber?.message }</Box> }
                        </Box>

                        <Box mb={2}>
                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    color: colors.primary,
                                    mb: 1,
                                }}
                            >Country</Typography>


                            <Autocomplete
                                id="country"
                                // sx={{ width: 300 }}
                                value={userCountry}
                                // inputValue={countryInputValue}
                                // onInputChange={(_event, newInputValue) => {
                                //     setCountryInputValue(newInputValue);
                                // }}
                            
                                // size='small'
                                options={countries}
                                autoHighlight
                                getOptionLabel={(option) => option.name.common}

                                onChange={(_e, value) => {
                                    // console.log(value);
                                    
                                    if (value) {
                                        setUserCountry(value);

                                        setValue(
                                            "country", value.name.common,
                                            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                                        );
                                    }
                                }} // prints the selected value

                                renderOption={(props: any, option) => {
                                    const { key, ...optionProps } = props;
                                    // const { ...optionProps } = props;

                                    return (
                                        <Box
                                            key={key}
                                            component="li"
                                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                            {...optionProps}
                                        >
                                            <img src={option.flags.png} alt={option.flags.alt}
                                                loading="lazy"
                                                style={{
                                                    maxWidth: "20px",
                                                    // marginRight: "10px"
                                                }}
                                            />

                                            {option.name.common}
                                        </Box>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Choose a country"
                                        label=""
                                        sx={{
                                            ...authMuiTextFieldStyle
                                        }}
                                        error={ errors.country ? true : false }
                                    />
                                )}
                            />
                            { errors.country && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.country?.message }</Box> }
                        </Box>

                        {
                            userData.gender &&
                            <Box mb={2}>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "16px",
                                        color: colors.primary,
                                        mb: 1,
                                    }}
                                >Gender</Typography>

                                <FormControl fullWidth>
                                    <Select
                                        id="gender"
                                        defaultValue={userData.gender}

                                        sx={{
                                            // color: "white",
                                            borderRadius: "16px",
                                            '.MuiOutlinedInput-notchedOutline': {
                                                // borderColor: '#fff',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: colors.primary,
                                                // borderColor: 'rgba(228, 219, 233, 0.25)',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: colors.primary,
                                                // borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                            },
                                            '.MuiSvgIcon-root ': {
                                                fill: `${colors.tertiary} !important`,
                                            }
                                        }}
                                        
                                        error={ errors.gender ? true : false }
                                        { ...register('gender') }
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        {/* <MenuItem value="Others">Others</MenuItem> */}
                                    </Select>
                                </FormControl>

                                { errors.gender && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.gender?.message }</Box> }
                            </Box>
                        }

                        {
                            userData.artistName && 
                            <Box mb={2}>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "16px",
                                        color: colors.primary,
                                        mb: 1,
                                    }}
                                >Artist name</Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='artistName'
                                    type='text'
                                    inputMode='text'
                                    defaultValue={userData.artistName}
                                
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    
                                    error={ errors.artistName ? true : false }
                                    { ...register('artistName') }
                                />
                                { errors.artistName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistName?.message }</Box> }
                            </Box>
                        }

                        {
                            userData.recordLabelName &&
                            <Box mb={2}>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "16px",
                                        color: colors.primary,
                                        mb: 1,
                                    }}
                                >Record label name</Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='recordLabelName'
                                    type='text'
                                    inputMode='text'
                                    defaultValue={userData.recordLabelName}
                                
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    
                                    error={ errors.recordLabelName ? true : false }
                                    { ...register('recordLabelName') }
                                />
                                { errors.recordLabelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.recordLabelName?.message }</Box> }
                            </Box>
                        }

                        {
                            userData.recordLabelLogo &&
                            <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}>
                                <Box 
                                    sx={{
                                        width: "340px",
                                        height: "292px",
                                        border: "2px solid #fff",
                                        borderRadius: "18px",
                                        display: "flex",
                                        alignItems: "center",
                                        overflow: "hidden",
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        document.getElementById("recordLabellogoUpload")?.click();
                                    }}
                                >
                                    { imagePreview ? (
                                        <Box>
                                            <img src={imagePreview} 
                                                alt='record label logo image preview'
                                                style={{
                                                    objectFit: "contain",
                                                    width: "100%",
                                                }}
                                            />
                                        </Box>
                                    ) : (
                                        <Box sx={{
                                            textAlign: "center",
                                            m: "auto",
                                        }}>
                                            <Typography sx={{
                                                fontWeight: "700",
                                                fontSize: "20px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                mb: 3
                                            }}>
                                                Upload logo
                                            </Typography>
                                            <img src={cloudUpload} alt='cloud Upload icon' />
                                        </Box>
                                    ) }
                                </Box>
                            </Box>
                        }

                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }

                        <Stack alignItems="center" mt={3}>
                            <Button variant="outlined" 
                                fullWidth type="submit" 
                                disabled={ !isValid || isSubmitting } 
                                sx={{ 
                                    bgcolor: colors.primary,
                                    color: colors.milk,
                                    border: 'none',
                                    width: "30%",

                                    "&.Mui-disabled": {
                                        background: colors.secondary,
                                        color: "#797979",
                                        border: 'none',
                                    },
                                    "&:hover": {
                                        bgcolor: colors.primary,
                                        // borderColor: colors.primary,
                                        border: 'none',
                                    },
                                    "&:active": {
                                        bgcolor: colors.primary,
                                        // borderColor: colors.primary,
                                        border: 'none',
                                    },
                                    "&:focus": {
                                        bgcolor: colors.primary,
                                        // borderColor: colors.primary,
                                        border: 'none',
                                    },

                                    padding: {xs: "9.05px 36.19px", md: "10px 40px" },

                                    borderRadius: "12px",
                                    textTransform: "unset"
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>

            <input 
                type="file" 
                id='recordLabellogoUpload' 
                name="recordLabellogoUpload" 
                accept='image/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </AccountWrapper>
    )
}
