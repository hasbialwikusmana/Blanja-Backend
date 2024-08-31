const pool = require("../config/db_blanja");
const register = ({ id, user_id, name }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO customers (id, user_id, name)VALUES($1, $2, $3)", [id, user_id, name], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateCustomer = ({ name, email, phone, gender, date_of_birth, photo }, id) => {
  return pool.query(
    "UPDATE customers SET  name = $1, email = COALESCE($2, email), phone = COALESCE($3, phone), gender = COALESCE($4, gender), date_of_birth = COALESCE($5, date_of_birth), photo = COALESCE($6, photo), updated_at = CURRENT_TIMESTAMP WHERE user_id = $7",
    [name, email, phone, gender, date_of_birth, photo, id]
  );
};

const updateImage = ({ photo }, user_id) => {
  return pool.query("UPDATE customers SET  photo = $1 WHERE user_id = $2", [photo, user_id]);
};

const findAll = ({ limit, offset, search, sort, sortBy }) => {
  return pool.query(`SELECT * FROM customers ${search ? `WHERE name ILIKE '%${search}%'` : ""} ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`, [limit, offset]);
};

const findOne = ({ id }) => {
  return pool.query("SELECT users.email,  customers.* FROM customers JOIN users ON customers.user_id = users.id WHERE customers.id = $1", [id]);
};

const countCustomer = ({ search }) => {
  return pool.query(`SELECT COUNT(*) AS total FROM customers ${search ? `WHERE name ILIKE '%${search}%'` : ""}`);
};

module.exports = { register, updateCustomer, updateImage, findAll, findOne, countCustomer };
