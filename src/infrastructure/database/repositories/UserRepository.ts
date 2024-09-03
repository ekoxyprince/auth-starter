import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import User from "../../../domain/entities/User";
import UserModel, { UserDocument } from "../models/UserModel";
import { AuthenticationError } from "../../../utils/customErrors";

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<void> {
    const createdUser = await new UserModel(user);
    await createdUser.save();
  }
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return new User(
      <string>userDoc._id,
      userDoc.fullname,
      userDoc.email,
      userDoc.username,
      userDoc.phone,
      userDoc.password,
      userDoc.ipAddress,
      userDoc.country
    );
  }
  async findByResetToken(token: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ resetToken: token });
    if (!userDoc) return null;
    return new User(
      <string>userDoc._id,
      userDoc.fullname,
      userDoc.email,
      userDoc.username,
      userDoc.phone,
      userDoc.password,
      userDoc.ipAddress,
      userDoc.country
    );
  }
  async updateInfo(user: User, id: string): Promise<void> {
    await UserModel.findOneAndUpdate({ _id: id }, user);
  }
  async updateResetToken(
    token: string | undefined,
    email: string
  ): Promise<void> {
    await UserModel.findOneAndUpdate({ email }, { resetToken: token });
  }
  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;
    return new User(
      <string>userDoc._id,
      userDoc.fullname,
      userDoc.email,
      userDoc.username,
      userDoc.phone,
      userDoc.password,
      userDoc.ipAddress,
      userDoc.country
    );
  }
  async findByUsername(username: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ username });
    if (!userDoc) return null;
    return new User(
      <string>userDoc._id,
      userDoc.fullname,
      userDoc.email,
      userDoc.username,
      userDoc.phone,
      userDoc.password,
      userDoc.ipAddress,
      userDoc.country
    );
  }
  async findByUsernameOrEmail(
    email?: string,
    username?: string
  ): Promise<User | null> {
    const userDoc = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (!userDoc) return null;
    return new User(
      <string>userDoc._id,
      userDoc.fullname,
      userDoc.email,
      userDoc.username,
      userDoc.phone,
      userDoc.password,
      userDoc.ipAddress,
      userDoc.country
    );
  }
}
