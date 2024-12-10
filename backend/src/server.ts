import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import constants from "./utils/constants";
import AppRouter from "./api/routes";
import responseClient from "http-response-client";
import database from "./database/database";
import logger from "./utils/logger";
/**
 * Main application class to initialize and start the server.
 */
class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  /**
   * Initialize middleware
   */
  private initMiddleware(): void {
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(cors());
  }

  /**
   * Initialize routes
   */
  private initRoutes(): void {
    this.app.use(AppRouter);
  }

  /**
   * Initialize error handling
   */
  private initErrorHandling(): void {
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
      responseClient.middlewares.errorCatcher(err, res);
    });
  }

  /**
   * Initialize database connection
   */
  private async initDatabase(): Promise<void> {
    try {
      logger.info("Connecting to database...");
      await database.getInstance().connect();
    } catch (error) {
      logger.error("Database connection failed:", error);
    }
  }

  /**
   * Setup server configurations and start listening
   */
  public async run(): Promise<void> {
    try {
      logger.info("Initializing server...");

      this.initMiddleware();
      this.initRoutes();
      this.initErrorHandling();

      await this.initDatabase();

      this.app.listen(constants.SERVICE_APP_PORT, () => {
        logger.info(`Server running on port: ${constants.SERVICE_APP_PORT}`);
      });
    } catch (error) {
      logger.error("Failed to start server:", error);
    }
  }
}

// Start the application
new App().run().catch((err) => {
  logger.error("Fatal error:", err);
});
