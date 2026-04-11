const pool = require("../database/")

/* ***************************
 *  Add a new review
 * ************************** */
async function addReview(review_text, inv_id, account_id) {
  try {
    const sql = "INSERT INTO review (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING review_id"
    const data = await pool.query(sql, [review_text, inv_id, account_id])
    return data.rows[0]
  } catch (error) {
    console.error("addReview error " + error)
    return null
  }
}

/* ***************************
 *  Delete a review by review_id
 * ************************** */
async function deleteReview(review_id) {
  try {
    const sql = "DELETE FROM review WHERE review_id = $1"
    const data = await pool.query(sql, [review_id])
    return data.rowCount > 0
  } catch (error) {
    console.error("deleteReview error " + error)
    return false
  }
}

/* ***************************
 *  Get all reviews for a specific inventory item
 * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const sql = `
      SELECT r.review_id, r.review_text, r.review_date, r.account_id, a.account_firstname, a.account_lastname
      FROM review r
      JOIN account a ON r.account_id = a.account_id
      WHERE r.inv_id = $1
      ORDER BY r.review_date DESC
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByInvId error " + error)
    return []
  }
}

/* ***************************
 *  Get a review by review_id
 * ************************** */
async function getReviewById(review_id) {
  try {
    const sql = "SELECT * FROM review WHERE review_id = $1"
    const data = await pool.query(sql, [review_id])
    return data.rows[0]
  } catch (error) {
    console.error("getReviewById error " + error)
    return null
  }
}

module.exports = { addReview, deleteReview, getReviewsByInvId, getReviewById }