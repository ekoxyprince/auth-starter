import IEmailRepository from "../../domain/repositories/IEmailRepository";
import CreateEmail from "../../domain/use-cases/email/CreateEmail";
import VerifyEmail from "../../domain/use-cases/email/VerifyEmail";
import EmailRepository from "../../infrastructure/database/repositories/EmailRepository";
import asyncHandler from "../../utils/asyncHandler";

export default class EmailController {
  private emailRepository: IEmailRepository;
  constructor() {
    this.emailRepository = new EmailRepository();
  }
  createEmail = asyncHandler(async (req, res) => {
    const createEmail = new CreateEmail(this.emailRepository);
    const otp = Math.floor(Math.random() * 9000 + 1000);
    const { email } = req.body;
    const createdEmail = await createEmail.execute({ email, otp });
    res.status(201).json({
      success: true,
      message: `Otp code sent to ${email}`,
    });
  });
  verifyEmail = asyncHandler(async (req, res) => {
    const verifyEmail = new VerifyEmail(this.emailRepository);
    const verifiedEmail = await verifyEmail.execute(req.body);
    res.status(200).json({
      success: true,
      message: `Email verified successfully`,
    });
  });
}
