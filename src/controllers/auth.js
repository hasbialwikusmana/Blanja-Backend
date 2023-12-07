const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const errorServ = new createError.InternalServerError();
const commonHelper = require("../helpers/common");
const authHelper = require("../helpers/auth");

const { findEmail, createUser, createSeller } = require("../models/auth");

const authControllers = {
  registerCustomer: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const { rowCount } = await findEmail(email);
      if (rowCount) {
        return res.json({
          Message: "Email is already used",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const id = uuidv4();
      let data = {
        id: id,
        name,
        email,
        password: passwordHash,
        role: "customer",
      };
      createUser(data)
        .then((result) => commonHelper.response(res, result.rows, 201, "Register success"))
        .catch((err) => res.send(err));
    } catch (error) {
      next(errorServ);
    }
  },
  registerSeller: async (req, res) => {
    try {
      const { name, email, password, phone, store_name, role } = req.body;
      const { rowCount } = await findEmail(email);
      if (rowCount) {
        return res.json({
          Message: "Email is already used",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const id = uuidv4();
      let data = {
        id: id,
        email,
        name,
        password: passwordHash,
        phone,
        store_name,
        role: "seller",
      };
      createSeller(data)
        .then((result) => commonHelper.response(res, result.rows, 201, "Register success"))
        .catch((err) => res.send(err));
    } catch (error) {
      next(errorServ);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [users],
      } = await findEmail(email);
      if (!users) {
        return res.json({
          Message: "Email is invalid",
        });
      }
      const isValidPassword = bcrypt.compareSync(password, users.password);
      if (!isValidPassword) {
        return res.json({
          Message: " Password is invalid",
        });
      }
      delete users.password;
      let payload = {
        email: users.email,
        role: users.role,
      };

      users.token = authHelper.generateToken(payload);
      users.refreshToken = authHelper.generateRefreshToken(payload);
      commonHelper.response(res, users, 201, "login is successful");
    } catch (error) {
      next(errorServ);
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT);
    let payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};
module.exports = authControllers;
