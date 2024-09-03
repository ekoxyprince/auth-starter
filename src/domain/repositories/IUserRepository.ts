import User from "../entities/User";

export interface IUserRepository {
  createUser(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  updateInfo(user: User, id: string): Promise<void>;
  updateResetToken(token: string | undefined, email: string): Promise<void>;
  findByResetToken(token: string): Promise<User | null>;
  findByUsernameOrEmail(
    email?: string,
    username?: string
  ): Promise<User | null>;
}
