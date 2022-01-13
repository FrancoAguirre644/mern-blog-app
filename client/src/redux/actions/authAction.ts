import { Dispatch } from "react";
import { IUserLogin, IUserRegister } from "../../interfaces/IUser";
import { getAPI, postAPI } from "../../utils/fetchData";
import { validRegister } from "../../utils/valid";
import { ALERT, IAlertType } from "../types/alertType";
import { AUTH, IAuthType } from "../types/authType";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await postAPI('login', userLogin);

        dispatch({
            type: AUTH,
            payload: res.data
        });

        dispatch({ type: ALERT, payload: { success: res.data.msg } });
        localStorage.setItem('logged', 'true');

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}

export const register = (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {

    const check = validRegister(userRegister);

    if (check.errLength > 0) return dispatch({
        type: ALERT,
        payload: {
            errors: check.errMsg
        }
    })

    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await postAPI('register', userRegister);

        console.log(res);

        dispatch({ type: ALERT, payload: { success: res.data.msg } });

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}

export const refreshToken = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {

    const logged = localStorage.getItem('logged');
    if (logged !== 'true') return;

    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI('refresh_token');

        dispatch({ type: AUTH, payload: res.data })

        dispatch({ type: ALERT, payload: {} })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}

export const logout = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {

    try {

        localStorage.removeItem('logged');
        await getAPI('logout');
        window.location.href = "/";

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
}