import BankAppError from "./baseError";
import { StatusCodes } from 'http-status-codes';


class UnauthorizedError extends BankAppError {
    constructor(detailedMessage) {
        super(StatusCodes.UNAUTHORIZED, detailedMessage, "Unauthorized Error", "Unauthorized Request");
    }
}

export default UnauthorizedError;