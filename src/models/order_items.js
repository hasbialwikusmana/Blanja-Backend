const Pool = require("../config/db_blanja");

const selectByOrderId = (order_id) => {
  return Pool.query("SELECT * FROM order_items WHERE order_id = $1", [order_id]);
};

const insert = (data) => {
  const { id, order_id, product_id, quantity, price } = data;
  return new Promise((resolve, reject) => {
    Pool.query("INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5)", [id, order_id, product_id, quantity, price], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const update = (data) => {
  const { id, order_id, product_id, quantity, price, updated_at } = data;
  return new Promise((resolve, reject) => {
    Pool.query("UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3, price = $4, updated_at = $5 WHERE id = $6", [order_id, product_id, quantity, price, updated_at, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const deleteData = (id) => {
  return Pool.query("DELETE FROM order_items WHERE order_id = $1", [id]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM order_items");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM order_items WHERE id = $1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectByOrderId,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
