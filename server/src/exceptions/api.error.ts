
type TError = Record<string, any>[]


class ApiError extends Error {

    status: number
    errors: TError
    

    constructor(status: number, message: string, errors: TError = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    
    static UnauthError() {
        return new ApiError(401, 'not authorized')
    }


    static BadRequest(message: string, errors: TError = []) {
        return new ApiError(400, message, errors)
    }

}


export default ApiError
