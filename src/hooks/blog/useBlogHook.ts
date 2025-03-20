import { useCallback, useState } from "react";

import { useSettingStore } from "@/state/settingStore";

import { blogInterface, commentInterface } from "@/typeInterfaces/blog.interface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";



export function useBlogHook() {
    // const accessToken = useUserStore((state) => state.accessToken);
    // const userData = useUserStore((state) => state.userData);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [blogPosts, setBlogPosts] = useState<blogInterface[]>();
    const [postDetails, setPostDetails] = useState<blogInterface>();
    const [postComments, setPostComments] = useState<commentInterface[]>();

    
    const getBlogPosts = useCallback(async (pageNo = currentPageNo, limit = limitNo) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/blog`, {
                params: {
                    page: pageNo,
                    limit: limit,
                    // userType
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setBlogPosts(response.result.posts);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);

            setIsSubmitting(false);
        }
    }, []);

    const getPostById = useCallback(async (post_slug: string, successFunc = (_resData: any) => {}) => {
        try {
            const response = (await apiClient.get(`/blog/${post_slug}`)).data;
            // console.log(response);

            if (response.status) {
                setPostDetails(response.result);
                successFunc(response.result);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);

    const searchBlogPosts = useCallback(async (searchWord: string, pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/blog/search`, {
                params: {
                    searchWord: searchWord,
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setBlogPosts(response.result.posts);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

            }
            
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    const getBlogPostsCommet = useCallback(async (
        post_id: string, pageNo: number, limitNo: number
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/blog/post/comment`, 
                {
                    params: { 
                        post_id, 
                        page: pageNo,
                        limit: limitNo 
                    },
                }
            )).data;
            // console.log(response);

            if (response.status) {
                setPostComments(response.result.posts);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
            }
            
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    // const editBlogPostsCommet = useCallback(async (
    //     post_id: string, content: string, author_name: string, author_email: string
    // ) => {
    //     setIsSubmitting(true);

    //     try {
    //         const response = (await apiClient.patch(`/blog/post/comment`, 
    //             { post_id, content, author_name, author_email }
    //         )).data;
    //         // console.log(response);

    //         if (response.status) {
    //             // setBlogPosts(response.result.posts);

    //             // setCurrentPageNo(response.result.currentPage);
    //             // setTotalPages(response.result.totalPages);
    //             // setTotalRecords(response.result.totalRecords);
    //         }
            
    //         setIsSubmitting(false);
    //     } catch (error: any) {
    //         const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

    //         setApiResponse({
    //             display: true,
    //             status: false,
    //             message: messageRes
    //         });

    //         setIsSubmitting(false);
    //     }
    // }, []);



    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,


        blogPosts,
        postDetails,
        postComments,
        // slugAvailability,

        getBlogPosts,
        getPostById,
        searchBlogPosts,

        getBlogPostsCommet,
    }
}
