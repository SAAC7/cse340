// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//route to buidl vehicle detail
router.get("/detail/:inventoryId" ,utilities.handleErrors(invController.buildByInvId));


// Route to error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));


module.exports = router;
