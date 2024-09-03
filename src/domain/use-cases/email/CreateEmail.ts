import Email from "../../entities/Email";
import IEmailRepository from "../../repositories/IEmailRepository";

export default class CreateEmail {
  constructor(private emailRepository: IEmailRepository) {
    this.emailRepository = emailRepository;
  }
  execute = async <T extends Email>(body: T) => {
    const email = new Email(body.email, body.otp);
    await this.emailRepository.createOrUpdate(email);
  };
}
