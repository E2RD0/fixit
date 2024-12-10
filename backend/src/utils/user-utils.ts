import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import constants from "./constants";
import IUser from "../structures/interfaces/model-interfaces/user-model-interface";
export default class UserUtils {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  static async generateJWT(user: Omit<IUser, "password">): Promise<string> {
    const token = jwt.sign({ user }, constants.JWT_SECRET, { expiresIn: "1h" });
    return token;
  }

}
