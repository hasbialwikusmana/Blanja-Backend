const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, search, sort, sortby }) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM sliders WHERE title ILIKE '%" + search + "%' ORDER BY " + sortby + " " + sort + " LIMIT " + limit + " OFFSET " + offset, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const insert = (data) => {
  const { id, title, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query("INSERT INTO sliders (id,title,photo) VALUES ($1,$2,$3)", [id, title, photo], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const update = (data) => {
  const { id, title, photo, updated_at } = data;
  return new Promise((resolve, reject) =>
    Pool.query("UPDATE sliders SET title = $1, photo = $2, updated_at = $3 WHERE id = $4", [title, photo, updated_at, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const deleteData = (id) => {
  return Pool.query("DELETE FROM sliders WHERE id = $1", [id]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM sliders");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT * FROM sliders WHERE id=$1", [id], (error, result) => {
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
