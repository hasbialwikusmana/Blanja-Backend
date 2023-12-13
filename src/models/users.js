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

const findID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM users WHERE id=$1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const setProfileCustomer = (data) => {
  const { id, name, email, phone, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query("UPDATE users SET name = $1, email = $2 , phone = $3, photo= $4 WHERE id = $5", [name, email, phone, photo, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const setProfileSeller = (data) => {
  const { id, name, email, phone, store_name, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query("UPDATE users SET name = $1, email = $2 , phone = $3, store_name = $4, photo= $5 WHERE id = $6", [name, email, phone, store_name, photo, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const deleteUser = (data) => {
  return new Promise((resolve, reject) => {
    Pool.query("DELETE FROM users WHERE id = $1", [data.id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const allUser = ({ limit, offset, search, sort, sortby }) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM users WHERE name ILIKE '%" + search + "%' ORDER BY " + sortby + " " + sort + " LIMIT " + limit + " OFFSET " + offset, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const customerUser = () => {
  return Pool.query("SELECT * FROM users WHERE role = 'customer'");
};

const sellerUser = () => {
  return Pool.query("SELECT * FROM users WHERE role = 'seller'");
};

const countData = () => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT COUNT(*) FROM products", (error, result) => {
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
  findID,
  allUser,
  deleteUser,
  customerUser,
  sellerUser,
  setProfileCustomer,
  setProfileSeller,
  countData,
};
