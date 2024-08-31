const createError = require("http-errors");
const cloudinary = require("../middlewares/cloudinary");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const commonHelper = require("../helpers/common");
const customers = require("../models/customer");
const users = require("../models/users");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { rowCount } = await users.findByEmail(email, {
      relation: "customers",
    });
    if (rowCount) {
      return commonHelper.response(res, null, 409, "Email already exists");
    }

    const schema = Joi.object({
      name: Joi.string().empty("").required(),
      email: Joi.string().empty("").required(),
      password: Joi.string().min(8).empty("").required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      // eslint-disable-next-line no-useless-escape
      return commonHelper.response(res, null, 400, error.details[0].message.replace(/\"/g, ""));
    }

    const salt = bcrypt.genSaltSync(10);
    const passwrodHash = bcrypt.hashSync(password, salt);

    const user = {
      id: uuidv4(),
      email,
      password: passwrodHash,
      role: "customer",
    };
    const customer = {
      id: uuidv4(),
      name,
      user_id: user.id,
    };
    await users.create(user);
    await customers.register(customer);

    commonHelper.response(res, null, 201, "Register success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getAllCustomer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || "created_at";
    const sortBy = req.query.sortBy || "ASC";
    const search = req.query.search || "";
    const offset = (page - 1) * limit;

    // Dapatkan data pelanggan dengan filter, pengurutan, dan paginasi menggunakan findAll
    const result = await customers.findAll({
      limit,
      offset,
      search,
      sort,
      sortBy,
    });

    // Hitung total data tanpa paginasi menggunakan countCustomer
    const countResult = await customers.countCustomer({ search });
    const totalData = parseInt(countResult.rows[0].total);

    // Hitung total halaman berdasarkan total data dan batasan
    const totalPage = Math.ceil(totalData / limit);

    // Siapkan objek pagination
    const pagination = {
      page: page,
      limit: limit,
      totalData: totalData,
      totalPage: totalPage,
    };

    // Berikan respons dengan data pelanggan, informasi paginasi, dan status sukses
    commonHelper.response(res, result.rows, 200, "success get data customers", pagination);
  } catch (error) {
    // Tangani kesalahan dengan memberikan respons dengan pesan kesalahan dan status yang sesuai
    commonHelper.response(res, null, 500, error.message);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email, { relation: "customers" });
    if (!user) {
      return next(new createError[403]());
    }
    delete user.password;
    commonHelper.response(res, user, 200, "Get profile success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(email);

    const { name, phone, gender, date_of_birth, photo } = req.body;

    const data = {
      name,
      phone,
      gender,
      date_of_birth,
      photo,
    };

    await customers.updateCustomer(data, user.user_id);
    commonHelper.response(res, null, 200, "Update customer success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const updateProfileImage = async (req, res, next) => {
  try {
    const emailAuth = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(emailAuth);

    if (!req.file) {
      return commonHelper.response(res, null, 400, "Image is required");
    }

    let photo = req.file;
    if (!photo) {
      return commonHelper.response(res, null, 400, "Photo is required");
    }

    const result = await cloudinary.uploader.upload(photo.path);
    const image = result.secure_url;

    const data = {
      photo: image,
    };

    if (user.photo !== null && user.photo !== undefined) {
      const public_id = user.photo.split("/").pop().split(".").shift();
      await cloudinary.uploader.destroy(public_id);
    }
    await customers.updateImage(data, user.user_id);
    commonHelper.response(res, data, 200, "update image success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

module.exports = {
  register,
  getAllCustomer,
  getProfile,
  updateProfile,
  updateProfileImage,
};
