import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/productController";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router.route("/uploadImage").post(uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
