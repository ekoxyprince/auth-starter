import { NextFunction, Request, Response } from "express";
import { CustomError, NotfoundError } from "../../utils/customErrors";
import path from "path";

export default (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.code || 500;
  res.status(statusCode).json({
    message: error.message,
    success: false,
    path: error.path,
    value: error.path,
    field: error.field,
    stack: error.stack,
  });
};

export const notFound = (req: Request, res: Response) => {
  throw new NotfoundError("Page not found", req.path, "route", req.originalUrl);
};
