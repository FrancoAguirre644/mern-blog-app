import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { getAPI } from "../../utils/fetchData";
import { GET_BLOGS_BY_CATEGORY_ID, GET_HOME_BLOGS, IGetBlogsCategoryType, IGetHomeBlogsType } from "../types/blogType";

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