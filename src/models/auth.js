const Pool = require("../config/db_blanja");

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM users WHERE email=$1", [email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const createUser = (data) => {
  const { id, name, email, password, phone, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query("INSERT INTO users(id,name,email,password,phone,role) VALUES($1,$2,$3,$4,$5,$6)", [id, name, email, password, phone, role], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const createSeller = (data) => {
  const { id, name, email, password, phone, store_name, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query("INSERT INTO users(id,name,email,password,phone,store_name,role) VALUES($1,$2,$3,$4,$5,$6,$7)", [id, name, email, password, phone, store_name, role], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  findEmail,
  createUser,
  createSeller,
};
