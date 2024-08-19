const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, search, sort, sortby }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT products.id,  products.product_name, category.name AS category_name, products.price, products.photo, products.created_at FROM products INNER JOIN category ON products.category_id = category.id WHERE products.product_name ILIKE $1 ORDER BY ${sortby} ${sort} LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset],
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

const selectById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT products.*, category.name AS category_name FROM products INNER JOIN category ON products.category_id = category.id WHERE products.id=$1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const select = (id) => {
  return Pool.query("SELECT * FROM products WHERE id = $1", [id]);
};

const selectProductsByCategoryId = async ({ category_id, limit, offset, search, sort, sortby }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT products.*, category.name AS category_name FROM products INNER JOIN category ON products.category_id = category.id WHERE products.category_id = $1 AND products.product_name ILIKE $2 ORDER BY ${sortby} ${sort} LIMIT $3 OFFSET $4`,
      [category_id, `%${search}%`, limit, offset],
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

// File: models/products.js

const selectProductsBySellerId = ({ limit, offset, search, sort, sortby, seller_id }) => {
  return Pool.query(`SELECT * FROM products WHERE seller_id = $1 AND product_name ILIKE $2 ORDER BY ${sortby} ${sort} LIMIT $3 OFFSET $4`, [seller_id, `%${search}%`, limit, offset]);
};

const countDataBySellerId = (seller_id) => {
  return Pool.query("SELECT COUNT(*) FROM products WHERE seller_id = $1", [seller_id]);
};

// const selectPopularProducts = () => {
//   return new Promise((resolve, reject) =>
//     Pool.query("SELECT * FROM products ORDER BY rating DESC LIMIT 5", (error, result) => {
//       if (!error) {
//         resolve(result);
//       } else {
//         reject(error);
//       }
//     })
//   );
// };

const insert = ({ id, category_id, seller_id, product_name, price, stock, description, photo }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      "INSERT INTO products (id, category_id,seller_id, product_name,  price, stock,   description,photo ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [id, category_id, seller_id, product_name, price, stock, description, photo],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};
const update = ({ category_id, seller_id, product_name, price, stock, description, photo }, id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE products SET category_id =  COALESCE($1, category_id) ,
      seller_id =  COALESCE($2, seller_id) ,
      product_name =  COALESCE($3, product_name) ,
      price =  COALESCE($4, price) ,
      stock =  COALESCE($5, stock) ,
      description =  COALESCE($6, description) ,
      photo =  COALESCE($7, photo) 
      WHERE id = $8
      RETURNING *`,
      [category_id, seller_id, product_name, price, stock, description, photo, id],
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
  return Pool.query("DELETE FROM products WHERE id = $1", [id]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM products");
};

const countDataByCategoryId = (category_id) => {
  return Pool.query("SELECT COUNT(*) FROM products WHERE category_id = $1", [category_id]);
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
  selectById,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
  selectProductsByCategoryId,
  countDataByCategoryId,
  selectProductsBySellerId,
  countDataBySellerId,
};
