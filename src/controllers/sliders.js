const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helpers/common");
const sliders = require("../models/sliders");
const cloudinary = require("../middlewares/cloudinary");

const getAllSliders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || "id";
    const sort = req.query.sort || "ASC";
    const result = await sliders.selectAll({ limit, search, offset, sort, sortby });
    const {
      rows: [count],
    } = await sliders.countData();
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

const getSlidersById = async (req, res, next) => {
  try {
    const id = String(req.params.id);

    // Panggil fungsi findId untuk mencari kategori berdasarkan ID
    const result = await sliders.findId(id);

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

const createSliders = async (req, res, next) => {
  try {
    const { title } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Blanja/sliders",
    });
    const photo = result.secure_url;
    const id = uuidv4();
    const data = {
      id,
      title,
      photo,
    };
    sliders.insert(data);
    commonHelper.response(res, data, 201, "create success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const updateSliders = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title } = req.body;
    const { rowCount } = await sliders.findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      // BUATKAN FOLDER DIDALAM FOLDER
      folder: "Blanja/sliders",
    });
    const photo = result.secure_url;

    const data = {
      id,
      title,
      photo,
      updated_at: new Date(),
    };
    await sliders.update(data);
    commonHelper.response(res, data, 200, "update success");
  } catch (error) {
    console.log(error);
  }
};

const deleteSliders = async (req, res, next) => {
  try {
    const id = req.params.id;
    await sliders.deleteData(id);
    commonHelper.response(res, null, 200, "delete success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

module.exports = {
  getAllSliders,
  getSlidersById,
  createSliders,
  updateSliders,
  deleteSliders,
};
