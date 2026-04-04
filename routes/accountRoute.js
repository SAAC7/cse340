const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")


/* ***********************
 * Routes Publicly Accessible
 *************************/
//route for login
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
);

// route for render the signup
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// route for the main account 
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
})

router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateView)
)


// route for register a new user
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

router.post(
  "/update",
  utilities.checkLogin,
  utilities.handleErrors(accountController.updateAccount)
)

router.post(
  "/update-password",
  utilities.checkLogin,
  utilities.handleErrors(accountController.updatePassword)
)





/**************************
 * Routes Protected - Employee or Admin Only
 *************************/



module.exports = router;