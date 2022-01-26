import { Dispatch } from "react";
import { IComment } from "../../interfaces/IComment";
import { postAPI } from "../../utils/fetchData";
import { ALERT, IAlertType } from "../types/alertType";
import { CREATE_COMMENT, ICreateCommentType } from "../types/commentType";

export const createComment = (data: IComment, token: string) => async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {

        const res = await postAPI('comments', data, token);

        console.log(res);

        dispatch({
            type: CREATE_COMMENT,
            payload: { ...res.data, user: data.user }
        })

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}