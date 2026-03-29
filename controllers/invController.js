const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/*************************************
 * Build VehivleDetail by vehicle_id
 ***************************************/

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getVehicleById(inv_id)
  const grid = await utilities.buildVehicleDetailGrid(data)
  let nav = await utilities.getNav()
  const vehicleName = `${data.inv_make} ${data.inv_model}`
  res.render("./inventory/details", {
    title: vehicleName,
    nav,
    grid,
  })
}

/*************************************
 * To launch error
 ************************************/

invCont.triggerError = async function (req, res, next) {
  throw new Error("Oh no! Se ha producido un error crítico (500).");
};


// admin pannel 



module.exports = invCont
