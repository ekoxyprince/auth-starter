import { ITokenService } from "../../infrastructure/services/ITokenService";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

export default class TokenService implements ITokenService {
  private jwtSecret: string = config.jwt_secret!;
  generateAccessToken(id: string): string {
    return jwt.sign({ id: id }, this.jwtSecret, {
      expiresIn: config.jwt_expires,
    });
  }
  generateRefereshToken(id: string): string {
    return jwt.sign({ id: id }, this.jwtSecret, {
      expiresIn: config.refresh_jwt_expires,
    });
  }
  verifyToken(token: string): string | null {
    try {
      const decoded: JwtPayload = <{ id: string }>(
        jwt.verify(token, this.jwtSecret)
      );
      return decoded.id;
    } catch (error) {
      return null;
    }
  }
  generateTokens(id: string): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(id);
    const refreshToken = this.generateRefereshToken(id);
    return { accessToken, refreshToken };
  }
}
