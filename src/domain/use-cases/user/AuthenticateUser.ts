import { IPasswordService } from "../../../infrastructure/services/IPasswordService";
import { AuthenticationError } from "../../../utils/customErrors";
import User from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export default class AuthenticateUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
  }
  execute = async <T extends User>(body: User): Promise<User> => {
    const userDoc = await this.userRepository.findByEmail(body.email!);
    if (!userDoc) throw new AuthenticationError("Incorrect email address");
    const isPassword = await this.passwordService.comparePassword(
      userDoc.password!,
      body.password!
    );
    if (!isPassword) throw new AuthenticationError("Incorrect password");
    return userDoc;
  };
}
