import { Dispatch } from 'redux';
import { ICategory } from '../../interfaces/ICategory';
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/fetchData';
import { ALERT, IAlertType } from '../types/alertType'
import { CREATE_CATEGORY, ICategoryType, GET_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY } from '../types/categoryType';

export const createCategory = (name: string, token: string) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await postAPI('categories', { name }, token);

        dispatch({
            type: CREATE_CATEGORY,
            payload: res.data.newCategory
        })

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const getCategories = () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI('categories');

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.categories
        })

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const updateCategory = (data: ICategory, token: string) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        dispatch({
            type: UPDATE_CATEGORY,
            payload: data
        })

        await patchAPI(`categories/${data._id}`, { name: data.name }, token);

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}

export const deleteCategory = (id: String, token: string) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } });

        dispatch({ type: DELETE_CATEGORY, payload: id });

        await deleteAPI(`categories/${id}`, token);

        dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
}