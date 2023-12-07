const Pool = require("../config/db_blanja");

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const createUser = (data) => {
  const { id, name, email, password, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users(id,email,password,name,role) VALUES('${id}','${email}','${password}','${name}','${role}')`, (error, result) => {
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
    Pool.query(`INSERT INTO users(id,name,email,password,phone,store_name,role) VALUES('${id}','${name}','${email}','${password}','${phone}','${store_name}','${role}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const allUser = () => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users`, (error, result) => {
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
  allUser,
};
