const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Review Data Validation Rules
  * ********************************* */
validate.reviewRules = () => {
  return [
    // review_text is required and must be string
    body("review_text")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Review text is required and must be at least 10 characters long.")
      .isLength({ max: 1000 })
      .withMessage("Review text must not exceed 1000 characters."),
  ]
}

/* ******************************
 * Check data and return errors or continue to add review
 * ***************************** */
validate.checkReviewData = async (req, res, next) => {
  const { review_text, inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const vehicleData = await require("../models/inventory-model").getVehicleById(inv_id)
    const reviews = await require("../models/review-model").getReviewsByInvId(inv_id)
    const grid = await utilities.buildVehicleDetailGrid(vehicleData)
    res.render("inventory/details", {
      title: vehicleData.inv_make + " " + vehicleData.inv_model,
      nav,
      grid,
      reviews,
      errors: errors.array(),
      inv_id,
      review_text
    })
    return
  }
  next()
}

module.exports = validate