const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const usersControllers = require("../controllers/users");
const { protect, isCustomer, isSeller } = require("../middlewares/auth");

// Rute untuk mendapatkan semua pengguna
router.get("/", usersControllers.user);

// Rute untuk mendapatkan semua pelanggan
router.get("/customer", usersControllers.customer);

// Rute untuk mendapatkan semua penjual
router.get("/seller", usersControllers.seller);

// Rute untuk mendapatkan profil pengguna (memerlukan otentikasi)
router.get("/profile", protect, usersControllers.profile);

// Rute untuk memperbarui profil pelanggan (memerlukan otentikasi dan peran pelanggan)
router.put("/customer/profile", protect, isCustomer, upload, usersControllers.updateProfileCustomer);

// Rute untuk memperbarui profil penjual (memerlukan otentikasi dan peran penjual)
router.put("/seller/profile", protect, isSeller, upload, usersControllers.updateProfileSeller);

// Rute untuk menghapus pengguna
router.delete("/:id", usersControllers.deleteUsers);

module.exports = router;
