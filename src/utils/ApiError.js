
export class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong!!", error = []) {
        super(message)
        this.statusCode = statusCode
        this.success = false
        this.error = error
        this.data = null
    }
}