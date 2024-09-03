import Token from "../entities/Token";

export default interface ITokenRepository {
  createToken(token: Token): Promise<void>;
  updateToken(token: string): Promise<void>;
  deleteToken(token: string): Promise<void>;
  findToken(token: string): Promise<Token | null>;
}
