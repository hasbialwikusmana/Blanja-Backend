const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helpers/common");
const orders = require("../models/orders");
const orderItems = require("../models/order_items");
const users = require("../models/users");
const products = require("../models/products");

const getAllOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || "orders.id";
    const sort = req.query.sort || "ASC";
    const result = await orders.selectAll({ limit, offset, sort, sortby });
    const {
      rows: [count],
    } = await orders.countData();
    const totalData = parseInt(count.count);
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      currentPage: page,
      limit: limit,
      totalData: totalData,
      totalPage: totalPage,
    };
    commonHelper.response(res, result.rows, 200, "Get data success", pagination);
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const orderResult = await orders.select(id);
    if (!orderResult.rowCount) {
      return next(new createError.NotFound("Order not found"));
    }

    const orderItemsResult = await orderItems.selectByOrderId(id);
    const responseData = {
      ...orderResult.rows[0],
      items: orderItemsResult.rows,
    };

    commonHelper.response(res, responseData, 200, "Get data success from database");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const getOrderBySellerId = async (req, res, next) => {
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

    const result = await orders.selectBySellerId({ limit, offset, search, sort, sortby, seller_id: sellerId });
    const {
      rows: [count],
    } = await orders.countDataBySellerId(sellerId);
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

const insertOrder = async (req, res, next) => {
  try {
    const { items, status, payment_method } = req.body;
    const emailCustomer = req.decoded.email;

    const {
      rows: [user],
    } = await users.findByEmail(emailCustomer, { relation: "customers" });

    if (!user) {
      return next(new createError.NotFound("User not found"));
    }

    const { id: customerId } = user;
    const sellerId = items.length ? items[0].seller_id : null;

    // menghitung total price
    const total_price = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderId = uuidv4();
    const orderData = {
      id: orderId,
      customer_id: customerId,
      seller_id: sellerId,
      total_price: total_price,
      status,
      payment_method,
    };

    await orders.insert(orderData);

    for (const item of items) {
      // Verify if product_id exists in the products table
      const productResult = await products.select(item.product_id);
      if (!productResult.rowCount) {
        return next(new createError.BadRequest(`Product with id ${item.product_id} does not exist`));
      }

      const orderItemData = {
        id: uuidv4(),
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      };

      await orderItems.insert(orderItemData);
    }

    commonHelper.response(res, { orderId, items }, 201, "Order created");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { total_price, status, payment_method } = req.body;

    const orderResult = await orders.findId(id);
    if (!orderResult.rowCount) {
      return next(createError(403, "Order ID is Not Found"));
    }

    const data = {
      id,
      total_price: total_price || orderResult.rows[0].total_price, // Update jika total_price berubah
      status: status || orderResult.rows[0].status, // Update jika status berubah
      payment_method: payment_method || orderResult.rows[0].payment_method, // Update jika payment_method berubah
      updated_at: new Date(), // Selalu update timestamp
    };

    orders
      .update(data)
      .then((result) => commonHelper.response(res, result.rows, 200, "Order updated"))
      .catch((err) => res.send(err));
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { rowCount } = await orders.findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    await orderItems.deleteData(id); // Delete order items first
    orders
      .deleteData(id)
      .then((result) => commonHelper.response(res, result.rows, 200, "Order deleted"))
      .catch((err) => res.send(err));
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderBySellerId,
  insertOrder,
  updateOrder,
  deleteOrder,
};
