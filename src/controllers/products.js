const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helpers/common");
const cloudinary = require("../middlewares/cloudinary");
const products = require("../models/products");
const users = require("../models/users");

const getAllProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "DESC";
    const sortby = req.query.sortby || "created_at";
    const offset = (page - 1) * limit;
    const result = await products.selectAll({ limit, offset, search, sort, sortby });
    const {
      rows: [count],
    } = await products.countData();
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
    commonHelper.response(res, result.rows, 200, "Data Products Success", pagination);
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      rows: [data],
    } = await products.selectById(id);

    commonHelper.response(res, data, 200, "Data Products By Id Success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getAllProductByCategoryId = async (req, res, next) => {
  try {
    const categoryId = req.params.category_id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "DESC";
    const sortby = req.query.sortby || "created_at";
    const offset = (page - 1) * limit;

    // Menambahkan category_id ke parameter selectAll
    const result = await products.selectProductsByCategoryId({ limit, offset, search, sort, sortby, category_id: categoryId });
    const {
      rows: [count],
    } = await products.countDataByCategoryId(categoryId); // Menghitung total data berdasarkan ID kategori
    const totalData = parseInt(count.count);
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      currentPage: page,
      limit: limit,
      totalData: totalData,
      totalPage: totalPage,
    };
    // if (result.rowCount === 0) {
    //   return next(createError(404, "Data Not Found"));
    // }
    commonHelper.response(res, result.rows, 200, "Data Products Success", pagination);
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getProductBySellerId = async (req, res, next) => {
  try {
    const emailSeller = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(emailSeller, { relation: "sellers" });
    const sellerId = user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "DESC";
    const sortby = req.query.sortby || "created_at";
    const offset = (page - 1) * limit;

    const result = await products.selectProductsBySellerId({ limit, offset, search, sort, sortby, seller_id: sellerId });
    const {
      rows: [count],
    } = await products.countDataBySellerId(sellerId);
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

    commonHelper.response(res, result.rows, 200, "Data Products By Seller Email Success", pagination);
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { category_id, product_name, price, stock, description } = req.body;
    const emailSeller = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(emailSeller, { relation: "sellers" });

    const { id: sellerId } = user;
    const imageUrl = await cloudinary.uploader.upload(req.file.path, {
      folder: "Blanja/Products",
    });
    const photo = imageUrl.secure_url;
    const data = {
      id: uuidv4(),
      category_id,
      seller_id: sellerId,
      product_name,
      price,
      stock,
      description,
      photo,
      created_at: new Date(),
    };
    products.insert(data);

    commonHelper.response(res, data, 201, "Product created");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { category_id, product_name, price, stock, description } = req.body;
    const emailSeller = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(emailSeller, { relation: "sellers" });

    const { id: sellerId } = user;

    const imageUrl = await cloudinary.uploader.upload(req.file.path, {
      folder: "Blanja/Products",
    });
    const photo = imageUrl.secure_url;
    const data = {
      category_id,
      seller_id: sellerId,
      product_name,
      price,
      stock,
      description,
      photo,
      updated_at: new Date(),
    };
    await products.update(data, id);

    commonHelper.response(res, data, 200, "Product updated");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { rowCount } = await products.findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    products.deleteData(id);

    commonHelper.response(res, null, 200, "Product successfully deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  getAllProductByCategoryId,
  getProductBySellerId,
  createProduct,
  updateProduct,
  deleteProduct,
};
