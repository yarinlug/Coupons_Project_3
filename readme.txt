Hi!
The tests are all done in main, they create all 3 services, and test each of their methods (with each method used properly).
If a method is used improperly the program will throw an exception and discontinue with the remaining tests, 
this is by design.



Notes:
In order to validate the functionality of the daily job, please disable the couponDailyExpirationJob.stop(); and the
deletion lines at the end of the tests and edit the end date of one of the two coupons that were added.




