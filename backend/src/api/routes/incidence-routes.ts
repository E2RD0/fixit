import express, { NextFunction, Request, Response } from "express";
import IncidenceController from "../controllers/incidence-controller";
import { verifyToken } from "../middlewares/auth-middleware";

const router = express.Router({
  strict: true,
});

router.get("/", verifyToken, IncidenceController.getAll);
router.get("/:id", verifyToken, IncidenceController.getIncidence);
router.post("/", verifyToken, IncidenceController.createIncidence);
router.put("/:id", verifyToken, IncidenceController.updateIncidence);

export default router;
