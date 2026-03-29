// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inv-validation")


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//route to buidl vehicle detail
router.get("/detail/:inventoryId" ,utilities.handleErrors(invController.buildByInvId));

// Route to error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

// admin panel
router.get("/", utilities.handleErrors(invController.buildManagement));

router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  invController.addClassification
)



module.exports = router;
