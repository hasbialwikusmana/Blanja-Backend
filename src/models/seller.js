const pool = require("../config/db_blanja");
const register = ({ id, user_id, name, phone, store_name }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO sellers (id, user_id, name, phone, store_name)VALUES($1, $2, $3, $4, $5)", [id, user_id, name, phone, store_name], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateSeller = ({ name, store_name, phone, store_description, photo }, id) => {
  return pool.query("UPDATE sellers SET  name = $1, store_name = $2, phone = $3, store_description = $4, photo = $5, updated_at = CURRENT_TIMESTAMP WHERE user_id = $6", [name, store_name, phone, store_description, photo, id]);
};

const updateImage = ({ photo }, user_id) => {
  return pool.query("UPDATE sellers SET  photo = $1 WHERE user_id = $2", [photo, user_id]);
};

const findAll = ({ limit, offset, search, sort, sortBy }) => {
  return pool.query(`SELECT * FROM sellers ${search ? `WHERE name ILIKE '%${search}%'` : ""} ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`, [limit, offset]);
};

const findOne = ({ id }) => {
  return pool.query("SELECT users.email,  sellers.* FROM sellers JOIN users ON sellers.user_id = users.id WHERE sellers.id = $1", [id]);
};

const countSeller = ({ search }) => {
  return pool.query(`SELECT COUNT(*) AS total FROM sellers ${search ? `WHERE name ILIKE '%${search}%'` : ""}`);
};

module.exports = { register, updateSeller, updateImage, findAll, findOne, countSeller };
