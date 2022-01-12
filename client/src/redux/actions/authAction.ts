import { IUserLogin } from "../../interfaces/IUser";
import { postAPI } from "../../utils/fetchData";
import { AUTH } from "../types/authType";

export const login = (userLogin: IUserLogin) => async (dispatch: any) => {
    try {
        const res = await postAPI('login', userLogin);

        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            }
        });

    } catch (error: any) {
        console.log(error.response.data.msg);
    }
}