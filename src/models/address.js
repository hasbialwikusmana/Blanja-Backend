const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
    SELECT *
    FROM address
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const select = (id) => {
  return Pool.query("SELECT * FROM address WHERE id = $1", [id]);
};

const selectByCustomerId = (customer_id) => {
  return Pool.query("SELECT * FROM address WHERE customer_id = $1 ORDER BY primary_address DESC, created_at DESC", [customer_id]);
};

const insert = (data) => {
  const { id, customer_id, address_as, recipient_name, recipient_phone, address, postal_code, city, primary_address } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      "INSERT INTO address (id, customer_id, address_as, recipient_name, recipient_phone, address, postal_code, city, primary_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [id, customer_id, address_as, recipient_name, recipient_phone, address, postal_code, city, primary_address],
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
  const { id, customer_id, address_as, recipient_name, recipient_phone, address, postal_code, city, primary_address, updated_at } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      "UPDATE address SET customer_id = $1, address_as = $2, recipient_name = $3, recipient_phone = $4, address = $5, postal_code = $6, city = $7, primary_address = $8, updated_at = $9 WHERE id = $10",
      [customer_id, address_as, recipient_name, recipient_phone, address, postal_code, city, primary_address, updated_at, id],
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

const updatePrimaryAddressFalse = (customer_id) => {
  return Pool.query("UPDATE address SET primary_address = false WHERE customer_id = $1 AND primary_address = true", [customer_id]);
};

const deleteData = (id) => {
  return Pool.query("DELETE FROM address WHERE id = $1", [id]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM address");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM address WHERE id = $1", [id], (error, result) => {
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
  insert,
  update,
  deleteData,
  countData,
  findId,
  updatePrimaryAddressFalse,
};
