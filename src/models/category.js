const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, search, sort, sortby }) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM category WHERE name ILIKE '%" + search + "%' ORDER BY " + sortby + " " + sort + " LIMIT " + limit + " OFFSET " + offset, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const insert = (data) => {
  const { id, name, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query("INSERT INTO category (id,name,photo) VALUES ($1,$2,$3)", [id, name, photo], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const update = (data) => {
  const { id, name, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query("UPDATE category SET name = $1, photo = $2 WHERE id = $3", [name, photo, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const deleteData = (id) => {
  return Pool.query("DELETE FROM category WHERE id = $1", [id]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM category");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM category WHERE id=$1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

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

module.exports = {
  selectAll,
  insert,
  update,
  deleteData,
  countData,
  findId,
  findEmail,
};
