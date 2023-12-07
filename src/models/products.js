const Pool = require("../config/db_blanja");

const selectAll = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
    SELECT 
      products.*, 
      category.name AS category_name
    FROM
      products 
    LEFT JOIN category ON products.id_category = category.id 
    ORDER BY ${sortby} ${sort} 
    LIMIT ${limit} OFFSET ${offset}
  `);
};

const select = (id) => {
  return Pool.query(`SELECT * FROM products  WHERE id='${id}'`);
};
const insert = (data) => {
  const { id, name, stock, price, photo, description, id_category } = data;
  return Pool.query(`INSERT INTO products (id,name,stock,price,photo,description,id_category) VALUES ('${id}','${name}',${stock},${price},'${photo}','${description}','${id_category}')`);
};
const update = (data) => {
  const { id, name, stock, price, photo, description, id_category } = data;
  return Pool.query(`UPDATE products SET name='${name}', stock=${stock}, price=${price} ,photo='${photo}' ,description='${description}',id_category='${id_category}' WHERE id='${id}'`);
};
const deleteData = (id) => {
  return Pool.query(`DELETE FROM products WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM products");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM products WHERE id='${id}'`, (error, result) => {
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
