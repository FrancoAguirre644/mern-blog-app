import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { getAPI } from "../../utils/fetchData";
import { GET_HOME_BLOGS, IGetHomeBlogsType } from "../types/blogType";

export const getHomeBlogs = () => async (dispatch: Dispatch<IAlertType| IGetHomeBlogsType>) => {
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