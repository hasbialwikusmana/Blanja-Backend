const createError = require("http-errors");
const cloudinary = require("../middlewares/cloudinary");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");

const { findEmail, customerUser, deleteUser, allUser, sellerUser, setProfileCustomer, setProfileSeller, countData, findID } = require("../models/users");

const usersControllers = {
  user: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await allUser({ limit, offset, search, sort, sortby });
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

  customer: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await customerUser({ limit, offset, search, sort, sortby });
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

  seller: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await sellerUser({ limit, offset, search, sort, sortby });
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

  profile: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [users],
    } = await findEmail(email);
    if (users.role === "customer") {
      delete users.store_name;
      delete users.password;
      delete users.role;
    } else if (users.role === "seller") {
      delete users.password;
      delete users.role;
    }
    commonHelper.response(res, users, 200);
  },

  updateProfileCustomer: async (req, res, next) => {
    try {
      const email = req.payload.email;
      const { name, phone } = req.body;
      const {
        rows: [users],
      } = await findEmail(email);
      if (!users) {
        res.json({ message: "Email Not Found" });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "User",
      });
      const photo = result.secure_url;

      const data = {
        id: users.id,
        name,
        email,
        phone,
        photo,
        updated_at: new Date(),
      };
      console.log(data);
      setProfileCustomer(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Update Profile Success"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },

  updateProfileSeller: async (req, res, next) => {
    try {
      const email = req.payload.email;
      const { name, phone, store_name } = req.body;
      const {
        rows: [users],
      } = await findEmail(email);
      if (!users) {
        res.json({ message: "Email Not Found" });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "User",
      });
      const photo = result.secure_url;
      const data = {
        id: users.id,
        name,
        email,
        phone,
        store_name,
        photo,
        updated_at: new Date(),
      };

      setProfileSeller(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Update Profile Success"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },

  deleteUsers: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findID(id);
      if (!rowCount) {
        res.json({ message: "id Not Found" });
      }
      const data = {
        id,
      };

      deleteUser(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Data Users Deleted"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },
};

module.exports = usersControllers;
