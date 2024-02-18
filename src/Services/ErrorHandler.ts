import { toast } from "react-toastify";

class ErrorHandler {
    public showError(err: any) {
        if (typeof err === 'string') {
            toast.error(err);
        } else if (err.response) {
            toast.error(err.response.data);
        } else if (err.message) {
            toast.error(err.message);
        } else {
            toast.error("Oops! Something went wrong.");
        }
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;
