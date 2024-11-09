export function parseErrorString(error: any) {
    if (error.message) {
        return error.message;
    }
    return "Unknown error";
}