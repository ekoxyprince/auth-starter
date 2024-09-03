import { AuthorizationError } from "../../../utils/customErrors";
import User from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export default class UpdateUser {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  execute = async <T extends User>(body: T, email: string) => {
    const foundUser = await this.userRepository.findByEmail(email);
    if (!foundUser) throw new AuthorizationError("Error fetching user!");
    await this.userRepository.updateInfo(body, foundUser.id!);
  };
}
