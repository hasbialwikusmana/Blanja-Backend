const createError = require("http-errors");
const cloudinary = require("../middlewares/cloudinary");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");
const { v4: uuidv4 } = require("uuid");
const { selectAll, select, countData, findId, insert, update, deleteData } = require("../models/category");
const categoryControllers = {
  getAllCategory: async (req, res, next) => {
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
      if (result.rowCount === 0) {
        return next(createError(404, "Data Not Found"));
      }
      commonHelper.response(res, result.rows, 200, "get data success", pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getCategory: (req, res, next) => {
    const id = String(req.params.id);
    select(id)
      .then((result) => commonHelper.response(res, result.rows, 200, "get data success"))
      .catch((err) => res.send(err));
  },
  insertCategory: async (req, res, next) => {
    const { name } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Category",
    });
    const photo = result.secure_url;
    const id = uuidv4();
    const data = {
      id: id,
      name,
      photo,
    };
    insert(data)
      .then((result) => commonHelper.response(res, result.rows, 201, "Category created"))
      .catch((err) => res.send(err));
  },
  updateCategory: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { name } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Category",
      });
      const photo = result.secure_url;

      const data = {
        id,
        name,
        photo,
      };
      update(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Category updated"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Category deleted"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoryControllers;
