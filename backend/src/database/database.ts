import mongoose from "mongoose";
import constants from "../utils/constants";
import logger from "../utils/logger";

/**
 * @class Database
 * @description Database class for the database connection
 */
export default class Database {
  private static _instance: Database;
  /**
   * @method connect
   * @description Method for the database connection
   */
  public async connect(): Promise<void> {
    await mongoose
      .connect(`mongodb://${constants.DB_HOST}:${constants.DB_PORT}/${constants.DB_NAME}`, {
        dbName: constants.DB_NAME,
        user: constants.DB_USERNAME,
        pass: constants.DB_PASSWORD,
        autoCreate: true,
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        logger.info("Database connection successful.");
      })
      .catch((err) => {
        setTimeout(async () => {
          await this.connect();
        }, 60 * 1000);
        logger.error(`Database connection error: ${err.message}`);
      });
  }

  /**
   * @method getInstance
   * @description Return unique instance of Database
   * @return {Database} database
   */
  public static getInstance(): Database {
    if (!Database._instance) this._instance = new Database();
    return Database._instance;
  }

  /**
   * @method isConnected
   * @description Verify is the database is connected
   * @return {boolean} is Connected
   */
  public isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}
