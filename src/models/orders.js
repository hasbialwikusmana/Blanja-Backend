const Pool = require("../config/db_blanja");

// const selectAll = ({ limit, offset, sort, sortby }) => {
//   return Pool.query(`
//     SELECT *
//     FROM orders
//     ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
// };

const selectAll = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
    SELECT 
      orders.id AS order_id,
      orders.customer_id,
      orders.seller_id,
      orders.total_price,
      orders.status,
      orders.payment_method,
      orders.address_id,
      orders.created_at AS order_created_at,
      orders.updated_at AS order_updated_at,
      order_items.id AS order_item_id,
      order_items.product_id,
      order_items.quantity,
      order_items.price AS item_price,
      order_items.created_at AS order_item_created_at,
      order_items.updated_at AS order_item_updated_at,
      products.product_name,
      products.photo AS product_photo,
      products.stock AS product_stock,
      products.description AS product_description,
      products.price AS product_price,
      products.created_at AS product_created_at,
      products.updated_at AS product_updated_at,
      address.id AS address_id,
      address.address_as,
      address.recipient_name,
      address.recipient_phone,
      address.address,
      address.postal_code,
      address.city,
      address.primary_address
    FROM orders
    JOIN order_items ON orders.id = order_items.order_id
    JOIN products ON order_items.product_id = products.id
    JOIN address ON orders.address_id = address.id AND address.primary_address = true
    ORDER BY ${sortby} ${sort} 
    LIMIT ${limit} OFFSET ${offset}`);
};

const select = (id) => {
  return Pool.query("SELECT * FROM orders WHERE id = $1", [id]);
};

const selectByCustomerId = ({ limit, offset, search, sort, sortby, customer_id }) => {
  return Pool.query(
    `
    SELECT 
      orders.id AS order_id,
      orders.customer_id,
      orders.seller_id,
      orders.total_price,
      orders.status,
      orders.payment_method,
      orders.address_id,
      orders.created_at,
      orders.updated_at,
      json_agg(json_build_object(
        'product_id', order_items.product_id,
        'quantity', order_items.quantity,
        'price', order_items.price,
        'product_name', products.product_name,
        'photo', products.photo
      )) AS items
    FROM 
      orders
    INNER JOIN 
      order_items 
      ON orders.id = order_items.order_id
    INNER JOIN
      products
      ON order_items.product_id = products.id
    WHERE 
      orders.customer_id = $1 
    AND 
      orders.status ILIKE $2 
    GROUP BY 
      orders.id
    ORDER BY 
      ${sortby} ${sort} 
    LIMIT $3 OFFSET $4
  `,
    [customer_id, `%${search}%`, limit, offset]
  );
};

const selectOrderItemsByOrderId = (order_id) => {
  return Pool.query(
    `
    SELECT 
      product_id, 
      quantity, 
      price 
    FROM 
      order_items
    WHERE 
      order_id = $1
  `,
    [order_id]
  );
};

const selectBySellerId = ({ limit, offset, search, sort, sortby, seller_id }) => {
  return Pool.query(
    `
    SELECT 
      orders.id AS order_id,
      orders.customer_id,
      orders.seller_id,
      orders.total_price,
      orders.status,
      orders.payment_method,
      orders.address_id,
      orders.created_at,
      orders.updated_at,
      json_agg(json_build_object(
        'product_id', order_items.product_id,
        'quantity', order_items.quantity,
        'price', order_items.price,
        'product_name', products.product_name,
        'photo', products.photo
      )) AS items
    FROM 
      orders
    INNER JOIN 
      order_items 
      ON orders.id = order_items.order_id
    INNER JOIN
      products
      ON order_items.product_id = products.id
    WHERE 
      orders.seller_id = $1 
    AND 
      orders.status ILIKE $2 
    GROUP BY 
      orders.id
    ORDER BY 
      ${sortby} ${sort} 
    LIMIT $3 OFFSET $4
  `,
    [seller_id, `%${search}%`, limit, offset]
  );
};

const insert = (data) => {
  const { id, customer_id, seller_id, address_id, total_price, status, payment_method } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      "INSERT INTO orders (id, customer_id, seller_id, address_id, total_price, status, payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, customer_id, seller_id, address_id, total_price, status, payment_method],
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

const update = (data) => {
  const { id, customer_id, seller_id, status, payment_method, total_price, address_id, updated_at } = data;

  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE orders 
       SET 
          customer_id = COALESCE($1, customer_id),
          seller_id = COALESCE($2, seller_id),
          status = COALESCE($3, status), 
          payment_method = COALESCE($4, payment_method), 
          total_price = COALESCE($5, total_price), 
          address_id = COALESCE($6, address_id), 
          updated_at = $7 
       WHERE id = $8
       RETURNING *`,
      [customer_id, seller_id, status, payment_method, total_price, address_id, updated_at, id],
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

const countDataByCustomerId = (customer_id) => {
  return Pool.query("SELECT COUNT(*) FROM orders WHERE customer_id = $1", [customer_id]);
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
  selectByCustomerId,
  selectOrderItemsByOrderId,
  selectBySellerId,
  countDataByCustomerId,
  countDataBySellerId,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
