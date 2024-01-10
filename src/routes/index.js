const express = require("express");
const productController = require("../controllers/ProductController");

const router = express.Router();

router.post("/create", productController.create);
router.post("/update", productController.update);
router.get("/:id/edit", productController.edit);
router.post("/delete", productController.delete);
router.get("/", productController.product);
router.get("/home", productController.index);
router.get("/search", productController.search);

module.exports = router;
