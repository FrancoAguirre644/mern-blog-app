import { IUser } from '../../interfaces/IUser';

export const AUTH = 'AUTH'

export interface IAuth {
    token?: string;
    user?: IUser;
}

export interface IAuthType {
    type: typeof AUTH;
    payload: IAuth;
}