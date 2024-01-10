package John_Coupon_Project.exceptions;

public class UnAuthorizedException extends Throwable {
    public UnAuthorizedException() {
    }

    public UnAuthorizedException(String message) {
        super(message);
    }
}
