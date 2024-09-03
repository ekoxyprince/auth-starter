import asyncHandler from "../../utils/asyncHandler";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";
import TokenService from "../services/TokenService";
import RegisterUser from "../../domain/use-cases/user/RegisterUser";
import AuthenticateUser from "../../domain/use-cases/user/AuthenticateUser";
import { ITokenService } from "../../infrastructure/services/ITokenService";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../infrastructure/services/IPasswordService";
import PasswordService from "../services/PasswordService";
import CreateTokens from "../../domain/use-cases/token/CreateTokens";
import TokenRepository from "../../infrastructure/database/repositories/TokenRepository";
import ITokenRepository from "../../domain/repositories/ITokenRepository";
import RotateToken from "../../domain/use-cases/token/RotateToken";
import UpdateUser from "../../domain/use-cases/user/UpdateUser";

export default class AuthController {
  private userRepository: IUserRepository;
  private tokenService: ITokenService;
  private passwordService: IPasswordService;
  private tokenRepository: ITokenRepository;
  constructor() {
    this.tokenService = new TokenService();
    this.userRepository = new UserRepository();
    this.passwordService = new PasswordService();
    this.tokenRepository = new TokenRepository();
  }
  verify = asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: "verified",
    });
  });
  signup = asyncHandler(async (req, res) => {
    const registerUser = new RegisterUser(this.userRepository);
    const user = await registerUser.execute({
      ...req.body,
      ipAddress: req.headers["x-forwared-for"] || req.ip,
    });
    res
      .status(201)
      .json({ success: true, message: "Registeration successful" });
  });
  signin = asyncHandler(async (req, res) => {
    const authenticateUser = new AuthenticateUser(
      this.userRepository,
      this.passwordService
    );
    const loggedUser = await authenticateUser.execute(req.body);
    const createTokens = new CreateTokens(
      this.tokenRepository,
      this.tokenService
    );
    const tokens = await createTokens.execute(loggedUser.id!);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: tokens,
    });
  });
  rotateToken = asyncHandler(async (req, res) => {
    const rotateToken = new RotateToken(
      this.tokenRepository,
      this.tokenService
    );
    const tokens = await rotateToken.execute(req.body);
    res.status(201).json({
      success: true,
      message: "Tokens generated successfully",
      data: tokens,
    });
  });
  resetPassword = asyncHandler(async (req, res) => {
    const updateUser = new UpdateUser(this.userRepository);
    await updateUser.execute(req.body, req.body.email);
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  });
}
