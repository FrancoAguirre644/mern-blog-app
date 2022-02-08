import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../utils/fetchData";
import { CREATE_BLOGS_BY_USER_ID, DELETE_BLOGS_BY_USER_ID, GET_BLOGS_BY_CATEGORY_ID, GET_BLOGS_BY_USER_ID, GET_HOME_BLOGS, ICreateBlogsUserType, IDeleteBlogsUserType, IGetBlogsCategoryType, IGetBlogsUserType, IGetHomeBlogsType } from "../types/blogType";
import { IBlog } from "../../interfaces/IBlog";
import { imageUpload } from "../../utils/imageUpload";

export const createBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
    let url;

    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        if(typeof(blog.thumbnail) !== 'string') {
            const photo = await imageUpload(blog.thumbnail);
            url = photo.url;
        } else {
            url = blog.thumbnail;
        } 

        const newBlog = {...blog, thumbnail: url };

        const res = await postAPI('blogs', newBlog, token);

        dispatch({
            type: CREATE_BLOGS_BY_USER_ID,
            payload: res.data
        })

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const getHomeBlogs = () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI('home/blogs');

        dispatch({
            type: GET_HOME_BLOGS,
            payload: res.data
        });

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const getBlogsByCategoryId = (id: string, search: string) => async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI(`blogs/category/${id}${search}`);

        dispatch({
            type: GET_BLOGS_BY_CATEGORY_ID,
            payload: { ...res.data, id }
        });

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const getBlogsByUserId = (id: string, search: string = `?page=${1}`) => async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {

        let limit = 3;
        let value = search ? search : `?page=${1}`;

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`);

        dispatch({
            type: GET_BLOGS_BY_USER_ID,
            payload: { ...res.data, id, search }
        });

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const updateBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {

    let url;

    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        if (typeof (blog.thumbnail) !== 'string') {
            const photo = await imageUpload(blog.thumbnail);
            url = photo.url;
        } else {
            url = blog.thumbnail;
        }

        const newBlog = { ...blog, thumbnail: url };

        const res = await putAPI(`blogs/${newBlog._id}`, newBlog, token);

        dispatch({ type: ALERT, payload: { success: res.data.msg } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const deleteBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {

    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        dispatch({
            type: DELETE_BLOGS_BY_USER_ID,
            payload: blog
        });

        const res = await deleteAPI(`blogs/${blog._id}`, token);

        dispatch({ type: ALERT, payload: { success: res.data.msg } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}