const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  const sql = "SELECT * FROM public.classification ORDER BY classification_name"
  return await pool.query(sql)
}

module.exports = {getClassifications}
