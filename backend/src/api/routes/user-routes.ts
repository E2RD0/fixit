import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";

const router = express.Router({
  strict: true,
});


router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  UserController.getUser(req, res, next);
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  UserController.createUser(req, res, next);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  UserController.loginUser(req, res, next);
});

export default router;
