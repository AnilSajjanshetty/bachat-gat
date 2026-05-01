import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  createBachat,
  listBachats,
  getBachat,
  addMember,
  addTransaction,
} from "../controllers/bachat.controller.js";

const router = express.Router();

router.get("/", authenticate, listBachats);
router.post(
  "/",
  authenticate,
  authorize(["superadmin", "gatadmin"]),
  createBachat,
);
router.get("/:id", authenticate, getBachat);
router.post(
  "/:id/members",
  authenticate,
  authorize(["superadmin", "gatadmin"]),
  addMember,
);
router.post(
  "/:id/transactions",
  authenticate,
  authorize(["collector", "gatadmin", "superadmin"]),
  addTransaction,
);

export default router;
