import { Router } from "express";
import AuthController from "../controllers/AuthController";
import validation from "../validation/index";
import { Middleware } from "express-validator/lib/base";

const authController = new AuthController();
const router = Router();

router.route("/verify").post([<any>validation.user(), authController.verify]);
router.route("/signup").post([<any>validation.signup(), authController.signup]);
router.route("/signin").post([<any>validation.signin(), authController.signin]);
router
  .route("/refresh")
  .post([<any>validation.refreshToken(), authController.rotateToken]);
router
  .route("/reset_password")
  .patch([<any>validation.resetPassword(), authController.resetPassword]);

export default router;
