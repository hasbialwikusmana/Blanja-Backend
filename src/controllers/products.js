const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");
const cloudinary = require("../middlewares/cloudinary");

const { selectAll, select, countData, findId, insert, update, deleteData } = require("../models/products");

const productsController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAll({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res, result.rows, 200, "get data success", pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: (req, res) => {
    const id = String(req.params.id);
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success from database");
      })
      .catch((err) => res.send(err));
  },
  insertProduct: async (req, res) => {
    const { name, stock, price, description, id_category } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Products",
    });
    const photo = result.secure_url;

    const id = uuidv4();
    const data = {
      id,
      name,
      stock,
      price,
      photo,
      description,
      id_category,
    };

    insert(data)
      .then((result) => commonHelper.response(res, result.rows, 201, "Create Product Success"))
      .catch((err) => res.send(err));
  },

  updateProduct: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "User",
      });
      const photo = result.secure_url;
      const { name, stock, price, description, id_category } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name,
        stock,
        price,
        photo,
        description,
        id_category,
      };
      update(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Product updated"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Product deleted"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productsController;
