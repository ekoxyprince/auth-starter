import Token from "../../../domain/entities/Token";
import ITokenRepository from "../../../domain/repositories/ITokenRepository";
import TokenModel from "../models/TokenModel";

export default class TokenRepository implements ITokenRepository {
  async createToken(token: Token): Promise<void> {
    const createdToken = await TokenModel.create(token);
  }
  async updateToken(token: string): Promise<void> {
    const updatedToken = await TokenModel.updateOne(
      { refreshToken: token },
      { isValid: false }
    );
  }
  async deleteToken(token: string): Promise<void> {
    const deletedToken = await TokenModel.deleteOne({ refreshToken: token });
  }
  async findToken(token: string): Promise<Token | null> {
    const foundToken = await TokenModel.findOne({ refreshToken: token });
    if (!foundToken || !foundToken.isValid) return null;
    return foundToken;
  }
}
