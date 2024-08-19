const multer = require("multer");
// max 10 MB
const maxSize = 10 * 1000 * 1000;
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});

module.exports = upload;
