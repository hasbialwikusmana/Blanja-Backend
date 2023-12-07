const createError = require("http-errors");
const cloudinary = require("../middlewares/cloudinary");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");

const { getUsersById, updateUser, updatePhotoUsers, allUser, findID } = require("../models/customerModels");

const customerControllers = {
  updateUsers: async (req, res, next) => {
    try {
      const { name, email, phone, store_name } = req.body;
      const id = String(req.params.id);
      const { rowCount } = await findID(id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
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

  getselectUsers: async (req, res) => {
    const id = String(req.params.id);
    getUsersById(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Get User Detail Success");
      })
      .catch((err) => res.send(err));
  },
};
module.exports = customerControllers;
