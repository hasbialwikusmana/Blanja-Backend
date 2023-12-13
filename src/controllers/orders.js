const createError = require("http-errors");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");
const { v4: uuidv4 } = require("uuid");
const { selectAllOrder, selectOrder, insertOrder, updateOrder, deleteOrder, findId, countData } = require("../models/orders");

const ordersControllers = {
  getAllOrder: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id_order";
      const sort = req.query.sort || "ASC";
      let result = await selectAllOrder({ limit, offset, sort, sortby });
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
      commonHelper.response(res, result.rows, 200, "Get Order Data Success", pagination);
    } catch (err) {
      console.log(err);
      next(errorServ);
    }
  },
  getDetailOrder: async (req, res) => {
    const id_user = String(req.params.id);
    selectOrder(id_user)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Get Order Detail Success");
      })
      .catch((err) => res.send(err));
  },
  createOrder: async (req, res) => {
    const { id_product, size, quantity_order, id_user } = req.body;
    const id_order = uuidv4();
    const data = {
      id_order,
      id_product,
      size,
      quantity_order,
      id_user,
    };
    insertOrder(data)
      .then((result) => commonHelper.response(res, result.rows, 201, "Create Order Success"))
      .catch((err) => {
        console.log(err);
      });
  },
  updateOrder: async (req, res) => {
    try {
      const id_order = String(req.params.id);
      const { id_product, size, quantity_order } = req.body;
      const { rowCount } = await findId(id_order);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        id_order,
        id_product,
        size,
        quantity_order,
      };
      updateOrder(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Update Order Success"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const id_order = String(req.params.id);
      const { rowCount } = await findId(id_order);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteOrder(id_order)
        .then((result) => commonHelper.response(res, result.rows, 200, "Delete Order Success"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ordersControllers;
