import { IAlert } from "../../interfaces/IAlert";
import { ALERT, IAlertType } from "../types/alertType";

const alertReducer = (state: IAlert = {}, action: IAlertType): IAlert => {
    switch (action.type) {
        case ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default alertReducer;