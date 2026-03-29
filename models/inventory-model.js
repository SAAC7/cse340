const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  const sql = "SELECT * FROM public.classification ORDER BY classification_name"
  return await pool.query(sql)
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/*******************************
 *Get all details items by inventory_id
 *********************************/
async function getVehicleById(inv_id){
  try{
    const sql = "SELECT * FROM public.inventory WHERE inv_id = $1"
    const data = await pool.query(sql,[inv_id])
    return data.rows[0]
  } catch (error){
    console.error("getVehicleById error " + error)
  }
}

async function addClassification(classification_name) {
try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)"
    const data = await pool.query(sql, [classification_name])
    return data
  } catch (error) {
    console.error("addClassification error:", error)
    return null
  }
}

module.exports ={ getClassifications, getInventoryByClassificationId, getVehicleById, addClassification }
