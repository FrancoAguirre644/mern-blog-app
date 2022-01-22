import { Dispatch } from "react";
import { getAPI } from "../../utils/fetchData";
import { ALERT, IAlertType } from "../types/alertType";
import { GET_OTHER_INFO, IGetOtherInfoType } from "../types/profileType";

export const getUserInfo = (id: string) => async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI(`users/${id}`);

        dispatch({
            type: GET_OTHER_INFO,
            payload: res.data
        });

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}