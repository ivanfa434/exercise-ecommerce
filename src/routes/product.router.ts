import { Router } from "express";
import {
  createProductController,
  updateProductController,
} from "../controller/product.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middlewares/role.middleware";

const router = Router();

router.post("/", verifyToken, verifyRole(["ADMIN"]), createProductController);
router.patch(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  updateProductController
);

export default router;
