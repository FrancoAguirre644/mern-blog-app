import { IUser } from "../../interfaces/IUser";
import { DELETE_BLOGS_BY_USER_ID, GET_BLOGS_BY_USER_ID, IBlogsUser, IDeleteBlogsUserType, IGetBlogsUserType } from "../types/blogType";

const blogsUserReducer = (state: IBlogsUser[] = [], action: IGetBlogsUserType | IDeleteBlogsUserType): IBlogsUser[] => {
    switch (action.type) {
        case GET_BLOGS_BY_USER_ID:
            if (state.every(item => item.id !== action.payload.id)) {
                return [...state, action.payload]

            } else {
                return state.map(item => (
                    item.id === action.payload.id
                        ? action.payload
                        : item
                ))
            }

        case DELETE_BLOGS_BY_USER_ID:
            return state.map(item => (
                item.id === (action.payload.user as IUser)._id
                ? {
                    ...item,
                    blogs: item.blogs.filter(blog => (
                        blog._id !== action.payload._id
                    ))
                }
                : item
            ))
            
        default:
            return state;
    }
}

export default blogsUserReducer;