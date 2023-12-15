const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");
const cloudinary = require("../middlewares/cloudinary");

const { selectAll, select, selectCategory, countData, findId, insert, update, deleteData } = require("../models/products");

const productsController = {
  getAllProduct: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const sortby = req.query.sortby || "name";
      const sort = req.query.sort || "ASC";
      const offset = (page - 1) * limit;
      const result = await selectAll({ limit, offset, search, sort, sortby });
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
      commonHelper.response(res, result.rows, 200, "Data Products Success", pagination);
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        rows: [data],
      } = await select(id);

      commonHelper.response(res, data, 200, "Data Products By Id Success");
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const products = await selectCategory(id);

      if (products.rowCount === 0) {
        return next(createError(404, "Data Not Found"));
      }
      commonHelper.response(res, products.rows[0], 200, "Data Products By Category Success");
    } catch (error) {
      console.log(error);
    }
  },

  insertProduct: async (req, res, next) => {
    try {
      const { name, stock, price, description, id_category } = req.body;
      const imageUrl = await cloudinary.uploader.upload(req.file.path, {
        folder: "User",
      });
      const photo = imageUrl.secure_url;
      const id = uuidv4();
      const data = {
        id,
        name,
        stock,
        price,
        photo,
        description,
        id_category,
        created_at: new Date(),
      };
      insert(data);

      res.json({
        status: "Success",
        message: "Product successfully created",
      });
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { name, stock, price, description, id_category } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "User",
      });
      const photo = result.secure_url;

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
        updated_at: new Date(),
      };
      update(data);
      res.json({
        status: "Success",
        message: "Product successfully updated",
      });
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
      deleteData(id);

      res.json({ message: "Product successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productsController;
