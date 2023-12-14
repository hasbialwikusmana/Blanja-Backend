const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT *
  FROM
  address
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const select = (id) => {
  return Pool.query("SELECT * FROM address WHERE id = $1", [id]);
};

const insert = (data) => {
  const { id, name, address_as, address, phone, postal_code, city, users_id } = data;
  return new Promise((resolve, reject) => {
    Pool.query("INSERT INTO address (id, name, address_as, address, phone, postal_code, city, users_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [id, name, address_as, address, phone, postal_code, city, users_id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const update = (data) => {
  const { id, name, users_id, address_as, address, phone, postal_code, city, updated_at } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      "UPDATE address SET name = $1, users_id = $2, address_as = $3, address = $4, phone = $5, postal_code = $6, city = $7, updated_at = $8 WHERE id = $9",
      [name, users_id, address_as, address, phone, postal_code, city, updated_at, id],
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
  insert,
  update,
  deleteData,
  countData,
  findId,
};
