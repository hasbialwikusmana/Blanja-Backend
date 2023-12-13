const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, search, sort, sortby }) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM products WHERE name ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const select = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT products.*, category.name AS category_name FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id=$1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const selectCategory = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT products.*, category.name AS category_name FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id_category=$1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const insert = (data) => {
  const { id, name, stock, price, photo, description, id_category } = data;
  return new Promise((resolve, reject) =>
    Pool.query("INSERT INTO products (id,name, stock, price, photo, description, id_category) VALUES ($1, $2, $3, $4, $5, $6,$7)", [id, name, stock, price, photo, description, id_category], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const update = (data) => {
  const { id, name, stock, price, photo, description, id_category } = data;
  return new Promise((resolve, reject) =>
    Pool.query("UPDATE products SET name=$1, stock=$2, price=$3, photo=$4, description=$5, id_category=$6 WHERE id=$7", [name, stock, price, photo, description, id_category, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const deleteData = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("DELETE FROM products WHERE id=$1 RETURNING *", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM products");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM products WHERE id=$1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
  selectCategory,
};
