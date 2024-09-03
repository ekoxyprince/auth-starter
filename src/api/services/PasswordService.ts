import { IPasswordService } from "../../infrastructure/services/IPasswordService";
import bcrypt from "bcryptjs";

export default class PasswordService implements IPasswordService {
  private saltRounds: number = 12;
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  comparePassword(hashedPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
