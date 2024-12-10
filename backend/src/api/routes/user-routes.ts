import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";
import { verifyToken } from "../middlewares/auth-middleware";

const router = express.Router({
  strict: true,
});


router.get("/:id", UserController.getUser);

router.post("/", UserController.createUser);

router.post("/login", UserController.loginUser);

router.get("/", verifyToken, UserController.getAll);

router.put("/:id", verifyToken, UserController.updateUser);

export default router;
