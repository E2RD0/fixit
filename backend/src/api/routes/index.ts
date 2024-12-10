import userRoutes from "./user-routes";
import incidenceRoutes from "./incidence-routes";
import express from "express";

/**
 * Base router for the application. Registers all route modules.
 */

const router = express.Router({
  strict: true,
});

router.use("/user", userRoutes);
router.use("incidence", incidenceRoutes);


export default router;
