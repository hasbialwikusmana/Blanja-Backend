const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helpers/common");
const addressModel = require("../models/address");
const users = require("../models/users");

const getAllAddress = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || "id";
    const sort = req.query.sort || "ASC";
    const result = await addressModel.selectAll({ limit, offset, sort, sortby });
    const {
      rows: [count],
    } = await addressModel.countData();
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
    next(new createError.InternalServerError());
  }
};

const getAddressById = (req, res) => {
  const id = String(req.params.id);
  addressModel
    .select(id)
    .then((result) => {
      commonHelper.response(res, result.rows[0], 200, "get data success from database");
    })
    .catch((err) => res.send(err));
};

const getAddressByCustomerId = async (req, res, next) => {
  try {
    const emailCustomer = req.decoded.email;

    // Mencari user berdasarkan email
    const {
      rows: [user],
    } = await users.findByEmail(emailCustomer, { relation: "customers" });

    if (!user) {
      return next(new createError.NotFound("User not found"));
    }

    const { id: customerId } = user;

    // Mengambil semua alamat berdasarkan customer_id
    const result = await addressModel.selectByCustomerId(customerId);

    if (result.rowCount === 0) {
      return next(new createError.NotFound("No address found for this customer"));
    }

    commonHelper.response(res, result.rows, 200, "Get address by email success");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const insertAddress = async (req, res, next) => {
  try {
    const { address_as, recipient_name, recipient_phone, address, postal_code, city, primary_address } = req.body;
    const emailCustomer = req.decoded.email;

    const {
      rows: [user],
    } = await users.findByEmail(emailCustomer, { relation: "customers" });

    if (!user) {
      return next(new createError.NotFound("User not found"));
    }

    const { id: customerId } = user;

    // Jika primary_address adalah true, ubah primary_address lain yang terkait dengan customer_id ini menjadi false
    if (primary_address) {
      await addressModel.updatePrimaryAddressFalse(customerId);
    }

    const data = {
      id: uuidv4(),
      customer_id: customerId,
      address_as,
      recipient_name,
      recipient_phone,
      address,
      postal_code,
      city,
      primary_address,
    };

    await addressModel.insert(data);

    commonHelper.response(res, data, 201, "Shipping Address created");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { address_as, recipient_name, recipient_phone, address, postal_code, city, primary_address } = req.body;

    // Mengambil customerId dari email customer
    const emailCustomer = req.decoded.email;
    const {
      rows: [user],
    } = await users.findByEmail(emailCustomer, { relation: "customers" });

    if (!user) {
      return next(new createError.NotFound("User not found"));
    }

    const { id: customerId } = user;

    const { rowCount } = await addressModel.findId(id);

    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }

    // Jika primary_address adalah true, ubah primary_address lain yang terkait dengan customer_id ini menjadi false
    if (primary_address) {
      await addressModel.updatePrimaryAddressFalse(customerId);
    }

    const data = {
      id,
      customer_id: customerId, // Pastikan customer_id disimpan
      address_as,
      recipient_name,
      recipient_phone,
      address,
      postal_code,
      city,
      primary_address,
      updated_at: new Date(),
    };

    await addressModel.update(data);
    commonHelper.response(res, data, 200, "Shipping Address updated");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { rowCount } = await addressModel.findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    addressModel
      .deleteData(id)
      .then((result) => commonHelper.response(res, result.rows, 200, "Shipping Address deleted"))
      .catch((err) => res.send(err));
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

module.exports = {
  getAllAddress,
  getAddressById,
  getAddressByCustomerId,
  insertAddress,
  updateAddress,
  deleteAddress,
};
