import { IUser } from '../../interfaces/IUser';

export const AUTH = 'AUTH'

export interface IAuth {
    msg?: string;
    access_token?: string;
    user?: IUser;
}

export interface IAuthType {
    type: typeof AUTH;
    payload: IAuth;
}