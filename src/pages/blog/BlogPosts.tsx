import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import FooterComponent from '@/components/Footer';
import HeaderComponent from '@/components/Header';

import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';
import { useEffect, useState } from 'react';
// import Chip from '@mui/material/Chip';
import PostItemComponent from '@/components/blog/PostItem';
// import featuredImagePlaceHolder from "@/assets/images/featuredImagePlaceHolder.jpg";
import { useBlogHook } from '@/hooks/blog/useBlogHook';
import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import TablePagination from '@mui/material/TablePagination';


function BlogPosts() {
    const [searchInputValue, setSearchInputValue] = useState('');
    // const [searchResult, setSearchResult] = useState<any[]>([]);

    const {
        // apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        // totalPages,


        blogPosts,
        // postDetails,
        // postComments,

        getBlogPosts,
        // getPostById,
        searchBlogPosts,
    } = useBlogHook();

    useEffect(() => {
        getBlogPosts()
    }, []);
    

    const handleSearchInputValue = (searchedWord: string) => {
        setSearchInputValue(searchedWord);
        if (!searchedWord) {
            getBlogPosts(currentPageNo, limitNo);
            return
        };

        // if (!searchedWord || searchedWord.length < 3 ) return;
        // searchBlogPosts(searchedWord, 1, limitNo);
    }
    
    
    return (
        <Box bgcolor={colors.bg}>
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                my: { xs: "35px", md: "75px"},
                // px: {xs: 5, md: 10},
                // mb: {xs: 5, md: 10},
            }}>
                <Box sx={{ px: {xs: 5, md: 10} }}>
                    <Typography
                        sx={{
                            fontFamily: 'Nohemi',
                            fontWeight: "700",
                            fontSize: {xs: "30px", sm: "38px", md: "60px"},
                            // lineHeight: "60px",
                            textAlign: "center",
                            color: colors.dark
                        }}
                    > SoundMuve Blog </Typography>

                    <Typography
                        sx={{
                            fontFamily: 'Inter',
                            fontWeight: "500",
                            fontSize: {xs: "14px", sm: "16px", md: "20px"},
                            // lineHeight: "24px",
                            textAlign: "center",
                            color: "#212121",
                            mb: 1
                        }}  
                    > Get the latest news on our product updates </Typography>

                    <form noValidate 
                        onSubmit={(e) => {
                            e.preventDefault();
                    
                            if (!searchInputValue || searchInputValue.length < 3 ) return;
                            searchBlogPosts(searchInputValue, 1, limitNo);
                        }}
                    >
                        <Stack alignItems="center">
                            <TextField variant="outlined" 
                                fullWidth 
                                id='search'
                                type='text'
                                inputMode='search'
                                placeholder='Search'
                                value={searchInputValue}
                                onChange={(e) => {
                                    handleSearchInputValue(e.target.value)
                                }}
                                
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: "gray"}} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: searchInputValue && (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleSearchInputValue("")}
                                        ><ClearIcon sx={{ color: "gray", fontSize: '16px'}} /></IconButton>
                                    ),
                                    sx: {
                                        borderRadius: "16px",
                                        color: 'gray'
                                    },
                                }}
                                sx={{
                                    maxWidth: "696px",
                                    '& label.Mui-focused': {
                                        color: 'var(--TextField-brandBorderFocusedColor)',
                                    },
                                    '& .MuiInputBase-input': { // Target input text
                                        color: colors.dark
                                    },
                                    '& .MuiInputBase-placeholder': { // Target placeholder text
                                        color: 'gray',
                                    },
                
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: '#fff',
                                        border: "1px solid #212121",
                                        borderRadius: "48px", // '17.8px',
                                        height: '42px',
                
                                        '& fieldset': {
                                            // borderColor: darkTheme ? "#c4c4c4" : "#272727", // '#E0E3E7',
                                            border: 'none'
                                        },
                                        '&:hover fieldset': {
                                            // borderColor: darkTheme ? "#fff" : "#272727", // '#B2BAC2',
                                            border: 'none'
                                        },
                                        '&.Mui-focused fieldset': {
                                            // borderColor: darkTheme ? '#fff' : '#272727', // '#6F7E8C',
                                            // borderWidth: "2px",
                                            border: 'none'
                                        },
                                    },
                                    zIndex: 9
                
                                }}
                            />
                        </Stack>
                    </form>

                    {/* <Stack direction="row" alignItems="center" justifyContent="center" spacing="15px" my={5}>
                        <Chip label="All" variant="outlined" 
                            sx={{
                                bgcolor: colors.primary,
                                borderColor: colors.dark,
                                color: colors.milk,
                                fontSize: "16px",
                                "&:hover": {
                                //   bgcolor: colors.secondary,
                                }
                            }}
                        />

                        <Chip label="Artist spotlight" variant="outlined" 
                            sx={{
                                // bgcolor: colors.primary,
                                borderColor: colors.dark,
                                fontSize: "16px",
                                // color: 'black', // Set text color
                                "&:hover": {
                                    bgcolor: colors.secondary,
                                }
                            }}
                        />

                        <Chip label="Updates" variant="outlined" 
                            sx={{
                                // bgcolor: colors.primary,
                                borderColor: colors.dark,
                                fontSize: "16px",
                                // color: 'black', // Set text color
                                "&:hover": {
                                    bgcolor: colors.secondary,
                                }
                            }}
                        />
                    </Stack> */}

                </Box>

                <Box sx={{ px: {xs: 0, md: 10} }} mt={5}>
                    {
                        blogPosts ? 
                            blogPosts.length ? 
                                <Box>
                                    <Grid container spacing={2}>
                                        {
                                            blogPosts.map((post) => (
                                                <Grid key={post._id} item xs={12} sm={6} md={4} xl={3}>
                                                    <PostItemComponent 
                                                        post={post}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>

                                    <Box mt={3}>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                            component="div"
                                            count={totalRecords} // totalRecords
                                            rowsPerPage={limitNo}
                                            page={currentPageNo -1}
                                            onPageChange={(_e, page)=> {
                                                // console.log(page);
                        
                                                const newPage = page + 1;
                                                getBlogPosts(newPage, limitNo);
                                            }}
                                            onRowsPerPageChange={(e) => {
                                                const value = e.target.value;
                                                // console.log(value);
                        
                                                setLimitNo(Number(value));
                                                getBlogPosts(1, limitNo);
                                            }}
                                        />
                                    </Box>                                    
                                </Box>
                            : <EmptyListComponent notFoundText='No blog post found.' />
                        : <LoadingDataComponent />
                    }
                </Box>
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default BlogPosts;