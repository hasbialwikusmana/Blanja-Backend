const createError = require("http-errors");
const cloudinary = require("../middlewares/cloudinary");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");

const { findEmail, getUsersById, updateUser, updatePhotoUsers, customerUser, deleteUser, allUser, sellerUser, findID } = require("../models/users");

const usersControllers = {
  updateUsers: async (req, res, next) => {
    try {
      const { name, email, phone, store_name } = req.body;
      const id = String(req.params.id);
      const { rowCount } = await findID(id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      } else if (email) {
        const { rowCount } = await findEmail(email);
        if (rowCount) {
          return res.json({
            Message: "Email is already used",
          });
        }
      }

      const data = {
        id,
        name,
        email,
        phone,
        store_name,
      };

      updateUser(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Update users Success"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
      next(errorServ);
    }
  },

  updatePhoto: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findID(id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Image User",
      });
      const photo = result.secure_url;

      const data = {
        id,
        photo,
      };

      updatePhotoUsers(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Update Users Success"))
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
        res.json({ message: "ID Not Found" });
      }
      const data = {
        id,
      };

      deleteUser(data)
        .then((result) => commonHelper.response(res, result.rows, 200, "Delete Users Success"))
        .catch((err) => res.send(err));
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
    delete users.password;
    commonHelper.response(res, users, 200);
  },

  user: async (req, res) => {
    try {
      const result = await allUser();

      if (result.rows.length > 0) {
        return res.status(200).json({
          message: "Here is all data",
          data: result.rows,
        });
      } else {
        return res.status(200).json({
          message: "No data available",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  },

  customer: async (req, res) => {
    try {
      const result = await customerUser();

      if (result.rows.length > 0) {
        return res.status(200).json({
          message: "Here is all data",
          data: result.rows,
        });
      } else {
        return res.status(200).json({
          message: "No data available",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  },

  seller: async (req, res) => {
    try {
      const result = await sellerUser();

      if (result.rows.length > 0) {
        return res.status(200).json({
          message: "Here is all data",
          data: result.rows,
        });
      } else {
        return res.status(200).json({
          message: "No data available",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  },

  getselectUsers: async (req, res) => {
    const id = String(req.params.id);
    const result = await getUsersById(id);
    if (result.rows.length > 0) {
      return res.status(200).json({
        message: "Here is all data",
        data: result.rows,
      });
    } else {
      return res.status(200).json({
        message: "No data available",
      });
    }
  },
};
module.exports = usersControllers;