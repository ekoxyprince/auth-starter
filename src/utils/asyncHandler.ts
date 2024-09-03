import { Request, Response, NextFunction } from "express";

type controllerFunction = (req: Request, res: Response) => Promise<void>;
export default (controller: controllerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
