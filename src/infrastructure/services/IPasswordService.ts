export interface IPasswordService {
  hashPassword(password: string): Promise<string>;
  comparePassword(hashedPassword: string, password: string): Promise<boolean>;
}
