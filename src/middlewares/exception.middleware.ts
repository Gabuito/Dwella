import type { NextFunction, Request, Response } from "express";
import type Exception from "../services/exception.service.ts";
import { ErrorResponse } from "../services/exception.service.ts";


export const errorHandler = (err: Exception, req: Request, res: Response) : void => {
  ErrorResponse(err, req.originalUrl, res);
};

export const catchError = (fn: Function) => (req: Request, res: Response, next: NextFunction) : void => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
