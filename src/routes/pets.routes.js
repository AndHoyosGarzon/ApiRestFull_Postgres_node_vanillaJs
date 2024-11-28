import { Router } from "express";
import { PetController } from "../controller/pet.controller.js";
import { verifyToken, verifyVet } from "../middlewares/jwt_middleware.js";

const router = Router();

router.get("/", verifyToken, verifyVet, PetController.findAll);

export default router;
