import userRoutes from "./user-routes";
import express from "express";

/**
 * Base router for the application. Registers all route modules.
 */

const router = express.Router({
  strict: true,
});

router.use("/user", userRoutes);


export default router;
