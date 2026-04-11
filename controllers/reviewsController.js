const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

const reviewCont = {}

reviewCont.buildByInvId = async function (req, res, next) {
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

reviewCont.addReview = async function (req, res) {
  const { review_text, inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  const addResult = await reviewModel.addReview(review_text, inv_id, account_id)

  if (addResult) {
    req.flash("success", "Review added successfully.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("error", "Failed to add review. Please try again.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

reviewCont.deleteReview = async function (req, res) {
  const review_id = req.params.review_id
  const inv_id = req.body.inv_id
  const currentUser = res.locals.accountData

  // Get the review to check ownership
  const review = await reviewModel.getReviewById(review_id)

  if (!review) {
    req.flash("error", "Review not found.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }

  // Check permissions: owner or admin
  const isOwner = currentUser.account_id === review.account_id
  const isAdmin = currentUser.account_type === 'Admin'

  if (!isOwner && !isAdmin) {
    req.flash("error", "You don't have permission to delete this review.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }

  const deleteResult = await reviewModel.deleteReview(review_id)

  if (deleteResult) {
    req.flash("success", "Review deleted successfully.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("error", "Failed to delete review. Please try again.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

module.exports = reviewCont