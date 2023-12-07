const Pool = require("../config/db_blanja");

const getUsersById = (id) => {
  return Pool.query(`SELECT * FROM users WHERE id = '${id}'`);
};

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

const findID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE id= '${id}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const updatePhotoUsers = (data) => {
  const { id, photo } = data;
  return Pool.query(`UPDATE users SET photo = '${photo}' WHERE id = '${id}'`);
};

const updateUser = (data) => {
  const { id, name, email, phone, store_name } = data;
  return Pool.query(`UPDATE users SET name = '${name}', email = '${email}' , phone = '${phone}', store_name = '${store_name}' WHERE id = '${id}'`);
};

const allUser = () => {
  return Pool.query(`SELECT * FROM users WHERE role = 'customer'`);
};

module.exports = {
  findEmail,
  getUsersById,
  findID,
  allUser,
  updateUser,
  updatePhotoUsers,
};
