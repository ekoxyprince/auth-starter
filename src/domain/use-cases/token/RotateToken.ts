import ITokenRepository from "../../repositories/ITokenRepository";
import Token from "../../entities/Token";
import { ITokenService } from "../../../infrastructure/services/ITokenService";
import config from "../../../config";
import {
  AuthenticationError,
  AuthorizationError,
} from "../../../utils/customErrors";

export default class RotateToken {
  private refreshTokenExps: string = config.refresh_jwt_expires!;
  constructor(
    private tokenRepository: ITokenRepository,
    private tokenService: ITokenService
  ) {
    this.tokenService = tokenService;
    this.tokenRepository = tokenRepository;
  }
  execute = async <T extends Token>(body: T) => {
    const foundToken = await this.tokenRepository.findToken(body.refreshToken);
    if (!foundToken) throw new AuthenticationError("Invalid auth Token");
    const decodedId = this.tokenService.verifyToken(foundToken.refreshToken);
    if (!decodedId)
      throw new AuthorizationError(
        "Error verifying refresh token signin again!"
      );
    await this.tokenRepository.updateToken(foundToken.refreshToken);
    const newTokens = this.tokenService.generateTokens(decodedId!);
    const tokenExpires: number =
      Date.now() + 1000 * 60 * 60 * 24 * parseInt(this.refreshTokenExps);
    const token = new Token(newTokens.refreshToken, tokenExpires, true);
    await this.tokenRepository.createToken(token);
    return newTokens;
  };
}
