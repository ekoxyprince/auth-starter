import Email from "../../entities/Email";
import IEmailRepository from "../../repositories/IEmailRepository";

export default class VerifyEmail {
  constructor(private emailRepository: IEmailRepository) {
    this.emailRepository = emailRepository;
  }
  execute = async <T extends Email>(body: T) => {
    const email = new Email(body.email, body.otp);
    await this.emailRepository.verifyEmail(email.email, email.otp);
  };
}
