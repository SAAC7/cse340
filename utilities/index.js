const invModel = require("../models/inventory-model")
const Util = {}
const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const jwt = require("jsonwebtoken")
require("dotenv").config()

const miles = new Intl.NumberFormat('en-US')

;
/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model + ' ' + vehicle.inv_year
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'+ vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model +'</h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details"> View Details </a>'
      grid += '<span>' 
      + money.format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/***************************************
 *Build vehicle detail view html
 ***************************************/
Util.buildVehicleDetailGrid = async function(data) {
  let display = '<div id="vehicle-detail-display">'
  display += `<img src="${data.inv_image}" alt="${data.inv_make} ${data.inv_model}">`
  display += '<div id="vehicle-details">'
  display += `<h2>${data.inv_make} ${data.inv_model} Details</h2>`
  display += `<p><strong>Price:</strong> ${money.format(data.inv_price)}</p>`
  display += `<p><strong>Description:</strong> ${data.inv_description}</p>`
  display += `<p><strong>Year:</strong> ${data.inv_year}</p>`
  display += `<p><strong>Color:</strong> ${data.inv_color}</p>`
  display += `<p><strong>Miles:</strong> ${miles.format(data.inv_miles)}</p>`
  display += '</div></div>'
  return display
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  res.locals.loggedin = false  // 👈 THIS LINE FIXES YOUR BUG

  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          res.clearCookie("jwt")
          return next()
        }
        res.locals.accountData = accountData
        res.locals.loggedin = true
        next()
      }
    )
  } else {
    next()
  }
}

Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let classificationList =
      '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
  }


  /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please check your credentials and try again.")
    return res.redirect("/account/login")
  }
 }


 /* ****************************************
  *  Check Account Type
  * ************************************ */
 Util.checkEmployeeOrAdmin = (req, res, next) => {
  const account = res.locals.accountData

  if (account && (account.account_type === "Employee" || account.account_type === "Admin")) {
    next()
  } else {
    req.flash("notice", "Please log in with proper credentials.")
    return res.status(401).render("account/login", {
      title: "Login"
    })
  }
}

module.exports = Util
