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

validate.inventoryRules = () => {
  return [
    body("inv_make").notEmpty().withMessage("Make required"),
    body("inv_model").notEmpty().withMessage("Model required"),
    body("inv_year").isInt().withMessage("Year must be number"),
    body("inv_price").isFloat().withMessage("Price must be number")
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: errors.array(),
      ...req.body // 🔥 ESTO HACE EL FORM STICKY
    })
  }
  next()
}

validate.checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: errors.array(),
      ...req.body // 🔥 ESTO HACE EL FORM STICKY
    })
  }
  next()
}

module.exports = validate