const { body, validationResult } = require("express-validator")
const utilities = require(".")

const validate = {}

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlphanumeric()
      .withMessage("No spaces or special characters allowed.")
  ]
}

validate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req) // ✅ SIN destructuring

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array()
    })
  }
  next()
}

module.exports = validate