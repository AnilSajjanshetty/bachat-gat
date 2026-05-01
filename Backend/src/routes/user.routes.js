import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authenticate, authorize(["superadmin", "gatadmin"]), listUsers);
router.get("/me", authenticate, (req, res) =>
  res.json({ success: true, data: req.user }),
);
router.get(
  "/:id",
  authenticate,
  authorize(["superadmin", "gatadmin", "member", "collector"]),
  getUser,
);
router.put(
  "/:id",
  authenticate,
  authorize(["superadmin", "gatadmin"]),
  updateUser,
);
router.delete("/:id", authenticate, authorize("superadmin"), deleteUser);

export default router;
