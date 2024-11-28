import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt_middleware.js";

const router = Router();

//api/v1/users
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", verifyToken, UserController.profile);

//Admin
router.get("/", verifyToken, verifyAdmin, UserController.findAll);
router.put(
  "/update-role-vet/:uid",
  verifyToken,
  verifyAdmin,
  UserController.updateRoleVet
);

export default router;
