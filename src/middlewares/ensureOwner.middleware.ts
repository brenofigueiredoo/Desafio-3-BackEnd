import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  
  if (req.client.id === id) {
    return next();
  } else {
    throw new AppError("You don't have permission", 401);
  }
};
export default ensureOwnerMiddleware;
