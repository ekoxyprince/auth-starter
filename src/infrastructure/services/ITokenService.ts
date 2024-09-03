import User from "../../domain/entities/User";

export interface ITokenService {
  generateAccessToken(id: string): string;
  generateRefereshToken(id: string): string;
  verifyToken(token: string): string | null;
  generateTokens(id: string): { accessToken: string; refreshToken: string };
}
