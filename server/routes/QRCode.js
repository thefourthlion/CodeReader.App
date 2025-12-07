const express = require("express");
const router = express.Router();
const {
  createQRCode,
  readQRCode,
  readQRCodeFromID,
  updateQRCode,
  deleteQRCode,
} = require("../controllers/QRCode");
router.route("/create").post(createQRCode);
router.route("/read").get(readQRCode);
router.route("/read/:id").get(readQRCodeFromID);
router.route("/update/:id").put(updateQRCode);
router.route("/delete/:id").delete(deleteQRCode);
module.exports = router;
