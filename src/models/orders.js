const Pool = require("../config/db_blanja");

const selectAllOrder = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT order_list.id_order,order_list.size,order_list.quantity_order,products.name,products.photo,users.id
  FROM order_list JOIN products ON order_list.id_product = products.id
  JOIN users ON order_list.id_user = users.id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectOrder = (id_user) => {
  return Pool.query(`SELECT order_list.id_order, order_list.size, products.name, products.id AS id_product, order_list.quantity_order, products.price, products.price*order_list.quantity_order AS total_price, products.photo
  FROM order_list
  LEFT JOIN products ON order_list.id_product = products.id WHERE id_user = '${id_user}'`);
};

const insertOrder = (data) => {
  const { id_order, id_product, size, quantity_order, id_user } = data;
  return new Promise((resolve, reject) =>
    Pool.query("INSERT INTO order_list (id_order, id_product, size, quantity_order, id_user) VALUES ($1, $2, $3, $4, $5)", [id_order, id_product, size, quantity_order, id_user], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const updateOrder = (data) => {
  const { id_order, id_product, size, quantity_order, updated_at } = data;
  return new Promise((resolve, reject) =>
    Pool.query("UPDATE order_list SET id_product = $1, size = $2, quantity_order = $3, updated_at = $4 WHERE id_order = $5", [id_product, size, quantity_order, updated_at, id_order], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const deleteOrder = (id_order) => {
  return Pool.query("DELETE FROM order_list WHERE id_order = $1", [id_order]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM order_list");
};

const findId = (id_order) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM order_list WHERE id_order=$1", [id_order], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllOrder,
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId,
};
