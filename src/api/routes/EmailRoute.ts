import EmailController from "../controllers/EmailController";
import { Router } from "express";
import validation from "../validation";
import { ValidationChain } from "express-validator";

const emailController = new EmailController();
const router = Router();

router
  .route("/verify")
  .post([<any>validation.email(), emailController.createEmail])
  .patch([<any>validation.email(), emailController.verifyEmail]);
router
  .route("/verify_useremail")
  .post([<any>validation.userEmail(), emailController.createEmail])
  .patch([<any>validation.userEmail(), emailController.verifyEmail]);

export default router;
