import ITokenRepository from "../../repositories/ITokenRepository";
import Token from "../../entities/Token";
import { ITokenService } from "../../../infrastructure/services/ITokenService";
import config from "../../../config";

export default class CreateTokens {
  private refreshTokenExps: string = config.refresh_jwt_expires!;
  constructor(
    private tokenRepository: ITokenRepository,
    private tokenService: ITokenService
  ) {
    this.tokenRepository = tokenRepository;
    this.tokenService = tokenService;
  }
  execute = async (
    id: string
  ): Promise<{ refreshToken: string; accessToken: string }> => {
    const tokens = this.tokenService.generateTokens(id);
    const tokenExpires: number =
      Date.now() + 1000 * 60 * 60 * 24 * parseInt(this.refreshTokenExps);
    const token = new Token(tokens.refreshToken, tokenExpires, true);
    await this.tokenRepository.createToken(token);
    return tokens;
  };
}
