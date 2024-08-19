const createError = require("http-errors");
const cloudinary = require("../middlewares/cloudinary");
const commonHelper = require("../helpers/common");
const { v4: uuidv4 } = require("uuid");
const category = require("../models/category");

const getAllCategory = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || "id";
    const sort = req.query.sort || "ASC";
    const result = await category.selectAll({ limit, search, offset, sort, sortby });
    const {
      rows: [count],
    } = await category.countData();
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
    next(new createError.InternalServerError());
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const id = String(req.params.id);

    // Panggil fungsi findId untuk mencari kategori berdasarkan ID
    const result = await category.findId(id);

    // Periksa apakah kategori ditemukan
    if (result && result.rows.length > 0) {
      // Jika kategori ditemukan, kirimkan respons dengan objek kategori
      commonHelper.response(res, result.rows[0], 200, "get data success");
    } else {
      // Jika kategori tidak ditemukan, kirimkan respons dengan status 404
      next(createError(404, "Data not found"));
    }
  } catch (error) {
    // Tangani kesalahan dengan mengirimkan respons dengan status 500
    console.error(error);
    next(createError(500, "Internal Server Error"));
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Blanja/Category",
    });
    const photo = result.secure_url;
    const id = uuidv4();
    const data = {
      id,
      name,
      photo,
    };
    category.insert(data);
    commonHelper.response(res, data, 201, "create success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const { rowCount } = await category.findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      // BUATKAN FOLDER DIDALAM FOLDER
      folder: "Blanja/Category",
    });
    const photo = result.secure_url;

    const data = {
      id,
      name,
      photo,
      updated_at: new Date(),
    };
    await category.update(data);
    commonHelper.response(res, data, 200, "update success");
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    await category.deleteData(id);
    commonHelper.response(res, null, 200, "delete success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
