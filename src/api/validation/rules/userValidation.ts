import { check, body } from "express-validator";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import IEmailRepository from "../../../domain/repositories/IEmailRepository";

export default class UserValidation {
  constructor(
    private userRepository: IUserRepository,
    private emailRepository: IEmailRepository
  ) {
    this.userRepository = userRepository;
    this.emailRepository = emailRepository;
  }
  email = check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter valid email")
    .custom((email, { req }) => {
      return this.emailRepository.isVerified(email).then((isVerified) => {
        if (!isVerified) {
          return Promise.reject("Check email entered");
        }
      });
    })
    .normalizeEmail();
  password = body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must contain atleast one lowercase, one uppercase, one digit and one special character"
    )
    .trim();
  pin = body("pin")
    .notEmpty()
    .withMessage("Pin required")
    .isLength({ min: 4 })
    .withMessage("Pin must be atleast 4 digits")
    .isNumeric()
    .withMessage("Pin must be numbers")
    .trim();
  phone = body("phone")
    .notEmpty()
    .withMessage("Phone number required")
    .isLength({ min: 10 })
    .withMessage("Enter a valid phone number")
    .trim();
  username = body("username").notEmpty().withMessage("Username is required");
  fullname = body("fullname").notEmpty().withMessage("Fullname is required");
  country = body("country").notEmpty().withMessage("Country is required");
  user = check("email").custom((email, { req }) => {
    return this.userRepository
      .findByUsernameOrEmail(email, req.body.username)
      .then((user) => {
        console.log(user);
        if (user) {
          return Promise.reject("User already exists with email or username");
        }
      });
  });
  validEmail = check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail();
  refreshToken = body("refreshToken")
    .notEmpty()
    .withMessage("Invalid token")
    .isLength({ min: 150 })
    .trim();
}
