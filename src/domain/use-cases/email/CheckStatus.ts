import Email from "../../entities/Email";
import IEmailRepository from "../../repositories/IEmailRepository";

export default class CheckStatus {
  constructor(private emailRepository: IEmailRepository) {
    this.emailRepository = emailRepository;
  }
  execute = async <T extends Email>(body: T) => {
    const isVerified = await this.emailRepository.isVerified(body.email);
    return isVerified;
  };
}
