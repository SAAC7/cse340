const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const reviewValidate = require("../utilities/review-validation")
const reviewsController = require("../controllers/reviewsController")


router.post(
    "/add",
    utilities.checkLogin,
    reviewValidate.reviewRules(),
    reviewValidate.checkReviewData,
    utilities.handleErrors(reviewsController.addReview)
);

// Eliminar review
router.post(
    "/delete/:review_id",
    utilities.checkLogin,
    utilities.handleErrors(reviewsController.deleteReview)
);


module.exports = router;