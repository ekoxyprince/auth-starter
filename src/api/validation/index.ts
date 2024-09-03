import UserValidation from "./rules/userValidation";
import { NextFunction, Request, Response } from "express";
import { validationResult, FieldValidationError } from "express-validator";
import { ValidationError } from "../../utils/customErrors";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";
import EmailRepository from "../../infrastructure/database/repositories/EmailRepository";
const userRepository = new UserRepository();
const emailRepository = new EmailRepository();
const userValidation = new UserValidation(userRepository, emailRepository);

class ValidationRules {
  result = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = <FieldValidationError>errors.array()[0];
      throw new ValidationError(
        error.msg,
        error.path,
        error.location,
        error.value
      );
    }
    next();
  };
  signup = () => {
    return [
      userValidation.user,
      userValidation.email,
      userValidation.username,
      userValidation.fullname,
      userValidation.password,
      userValidation.pin,
      userValidation.country,
      userValidation.phone,
      this.result,
    ];
  };
  email = () => [userValidation.validEmail, this.result];
  username = () => [userValidation.username, this.result];
  user = () => [userValidation.user, this.result];
  signin = () => [userValidation.email, userValidation.password, this.result];
  userEmail = () => [userValidation.email, this.result];
  refreshToken = () => [userValidation.refreshToken, this.result];
  resetPassword = () => [
    userValidation.email,
    userValidation.password,
    this.result,
  ];
}

export default new ValidationRules();
