import BankAppError from "./baseError";
import { StatusCodes } from 'http-status-codes';

class InvalidError extends BankAppError {
    constructor(detailedMessage) {
        super(StatusCodes.BAD_REQUEST, detailedMessage, "Invalid Error", "Invalid Request");
    }
}

export default InvalidError;