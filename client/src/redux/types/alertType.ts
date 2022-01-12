import { IAlert } from "../../interfaces/IAlert";

export const ALERT = 'ALERT';

export interface IAlertType {
    type: typeof ALERT;
    payload: IAlert
}