import Email from "../entities/Email";

export default interface IEmailRepository {
  findEmail(email: string): Promise<Email | null>;
  createOrUpdate(email: Email): Promise<void>;
  isVerified(email: string): Promise<boolean>;
  verifyEmail(email: string, otp: number): Promise<void>;
}
