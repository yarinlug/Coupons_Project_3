package John_Coupon_Project.services;

import John_Coupon_Project.exceptions.CouponException;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.repositories.CouponRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Service class for handling the daily expiration of coupons through a background job.
 */
@Service
public class CouponDailyExpirationJob implements Runnable {

    // Flag to control the execution of the job
    public boolean quit;

    // Services and repositories required for the job
    public CompaniesService companiesService;
    public CouponRepository couponRepository;

    /**
     * Constructor for CouponDailyExpirationJob.
     *
     * @param companiesService The service for managing companies.
     * @param couponRepository The repository for coupon-related operations.
     */
    public CouponDailyExpirationJob(CompaniesService companiesService, CouponRepository couponRepository) {
        this.companiesService = companiesService;
        this.couponRepository = couponRepository;
    }

    /**
     * The main method that gets executed when the job runs.
     */
    @Override
    public void run() {
        // Initialize quit as false
        quit = false;

        try {
            while (!quit) {
                // Get the current date
                LocalDate currentDate = LocalDate.now();

                // Find coupons with expiration dates before the current date
                ArrayList<Coupon> expiredCoupons = couponRepository.findCouponsByEndDateBefore(LocalDate.now());

                // Delete expired coupons
                for (Coupon coupon : expiredCoupons) {
                    companiesService.deleteCoupon(coupon.getId());
                }

                // Sleep for 24 hours (86400000 milliseconds) before the next check
                Thread.sleep(86400000);
            }
        } catch (CouponException | InterruptedException ignored) {
            // Exceptions are ignored in this example, but you might want to log or handle them differently
        }
    }

    /**
     * Stops the execution of the job.
     */
    public void stop() {
        quit = true;
    }
}
