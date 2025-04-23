import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response.wrapper.ts";
import type { ErrorHelper } from "../utils/error.ts";


export const errorHandler = (err: ErrorHelper, req: Request, res: Response) : void => {
  errorResponse(res, err.status, err.url, err.value);
};

export const catchError = (fn: Function) => (req: Request, res: Response, next: NextFunction) : void => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
