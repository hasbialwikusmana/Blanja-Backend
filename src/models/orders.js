const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
    SELECT *
    FROM orders
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const select = (id) => {
  return Pool.query("SELECT * FROM orders WHERE id = $1", [id]);
};

const selectBySellerId = ({ limit, offset, search, sort, sortby, seller_id }) => {
  return Pool.query(`SELECT * FROM orders WHERE seller_id = $1 AND status ILIKE $2 ORDER BY ${sortby} ${sort} LIMIT $3 OFFSET $4`, [seller_id, `%${search}%`, limit, offset]);
};
const insert = (data) => {
  const { id, customer_id, seller_id, total_price, status, payment_method } = data;
  return new Promise((resolve, reject) => {
    Pool.query("INSERT INTO orders (id, customer_id, seller_id, total_price, status, payment_method) VALUES ($1, $2, $3, $4, $5, $6)", [id, customer_id, seller_id, total_price, status, payment_method], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const update = (data) => {
  const { id, customer_id, seller_id, status, payment_method, total_price, updated_at } = data;

  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE orders 
       SET 
          customer_id = COALESCE($1, customer_id),
          seller_id = COALESCE($2, seller_id),
          status = COALESCE($3, status), 
          payment_method = COALESCE($4, payment_method), 
          total_price = COALESCE($5, total_price), 
          updated_at = $6 
       WHERE id = $7
       RETURNING *`,
      [customer_id, seller_id, status, payment_method, total_price, updated_at, id],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const deleteData = (id) => {
  return Pool.query("DELETE FROM orders WHERE id = $1", [id]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM orders");
};

const countDataBySellerId = (seller_id) => {
  return Pool.query("SELECT COUNT(*) FROM orders WHERE seller_id = $1", [seller_id]);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM orders WHERE id = $1", [id], (error, result) => {
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
  selectBySellerId,
  countDataBySellerId,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
