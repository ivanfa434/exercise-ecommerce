import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getProductBySlugController,
  getProductsController,
  updateProductController,
} from "../controller/product.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getProductsController);
router.post("/", verifyToken, verifyRole(["ADMIN"]), createProductController);
router.get("/:slug", getProductBySlugController);
router.patch(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  updateProductController
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  deleteProductController
);

export default router;
