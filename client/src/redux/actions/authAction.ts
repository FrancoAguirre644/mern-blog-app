import { Dispatch } from "react";
import { IUserLogin } from "../../interfaces/IUser";
import { postAPI } from "../../utils/fetchData";
import { ALERT, IAlertType } from "../types/alertType";
import { AUTH, IAuthType } from "../types/authType";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await postAPI('login', userLogin);

        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            }
        });

        dispatch({ type: ALERT, payload: { success: "Login success!" } });

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}