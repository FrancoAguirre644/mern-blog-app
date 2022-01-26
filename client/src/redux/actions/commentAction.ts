import { Dispatch } from "react";
import { IComment } from "../../interfaces/IComment";
import { getAPI, postAPI } from "../../utils/fetchData";
import { ALERT, IAlertType } from "../types/alertType";
import { CREATE_COMMENT, GET_COMMENTS, ICreateCommentType, IGetCommentsType } from "../types/commentType";

export const createComment = (data: IComment, token: string) => async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {

        const res = await postAPI('comments', data, token);

        dispatch({
            type: CREATE_COMMENT,
            payload: { ...res.data, user: data.user }
        })

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const getComments = (id: string) => async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {

        let limit = 8;

        const res = await getAPI(`comments/blog/${id}?limit=${limit}`);

        dispatch({
            type: GET_COMMENTS,
            payload: {
                data: res.data.comments,
                total: res.data.total
            }
        })

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}