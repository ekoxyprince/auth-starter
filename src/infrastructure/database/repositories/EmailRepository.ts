import IEmailRepository from "../../../domain/repositories/IEmailRepository";
import Email from "../../../domain/entities/Email";
import EmailModel from "../models/EmailModel";
import { BadrequestError } from "../../../utils/customErrors";

export default class EmailRepository implements IEmailRepository {
  async findEmail(email: string): Promise<Email | null> {
    let emailDoc = await EmailModel.findOne({ email });
    if (!emailDoc) return null;
    return new Email(emailDoc.email, emailDoc.otp, emailDoc.isVerified);
  }
  async createOrUpdate(email: Email): Promise<void> {
    let emailDoc = await EmailModel.findOne({ email: email.email });
    if (emailDoc) {
      emailDoc["otp"] = email.otp;
      await emailDoc.save();
    } else {
      await EmailModel.create(email);
    }
  }
  async isVerified(email: string): Promise<boolean> {
    let emailDoc = await EmailModel.findOne({ email });
    if (!emailDoc) return false;
    return emailDoc.isVerified;
  }
  async verifyEmail(email: string, otp: number): Promise<void> {
    let emailDoc = await EmailModel.findOne({ email, otp });
    if (!emailDoc) throw new BadrequestError("Incorrect otp code!");
    emailDoc["isVerified"] = true;
    await emailDoc.save();
  }
}
