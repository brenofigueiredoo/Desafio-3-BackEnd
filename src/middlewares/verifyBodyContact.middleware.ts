import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/appError";

const verifyBodyContactMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const verifyData = Object.keys(req.body);
    
    if(verifyData.includes("name") || verifyData.includes("email") || verifyData.includes("phone")) {
        return next()
    } else {
        throw new AppError("It is necessary to send something in the body ")
    }

  }

  export default verifyBodyContactMiddleware