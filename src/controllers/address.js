const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");
const { selectAll, select, countData, findId, insert, update, deleteData } = require("../models/address");

const shippingAddressController = {
  getAllAddress: async (req, res, next) => {
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
      next(errorServ);
    }
  },
  getAddressById: (req, res) => {
    const id = String(req.params.id);
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success from database");
      })
      .catch((err) => res.send(err));
  },
  insertAddress: async (req, res) => {
    const { name, users_id, address_as, address, phone, postal_code, city } = req.body;
    const id = uuidv4();
    const data = {
      id,
      name,
      users_id,
      address_as,
      address,
      phone,
      postal_code,
      city,
      created_at: new Date(),
    };
    insert(data)
      .then((result) => commonHelper.response(res, result.rows, 201, "Create Shipping Address success"))
      .catch((err) => res.send(err));
  },

  updateAddress: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { name, users_id, address_as, address, phone, postal_code, city } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name,
        users_id,
        address_as,
        address,
        phone,
        postal_code,
        city,
        updated_at: new Date(),
      };
      update(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Shipping Address updated"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteData(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Shipping Address deleted"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },
};

module.exports = shippingAddressController;
