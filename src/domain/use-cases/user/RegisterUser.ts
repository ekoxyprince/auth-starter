import User from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export default class RegisterUser {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  execute = async <T extends User>(body: T) => {
    const user = new User(
      undefined,
      body.fullname,
      body.email,
      body.username,
      body.phone,
      body.password,
      body.ipAddress,
      body.country,
      body.pin
    );
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  };
}
