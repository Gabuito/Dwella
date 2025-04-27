import type { Response } from "express";

interface ErrorHandler extends Error {
  url?: string;
  status: number;
  err: Error;
}


export default class Exception extends Error implements ErrorHandler {

  public status: number;
  public url?: string;
  public err: Error;

  constructor(message: string, status: number, err: Error, url?: string)  {
    super(message);
    this.status = status;
    this.url = url;
    this.err = err || new Error(message);
    super.stack = this.err.stack;
    super.name = this.constructor.name;
  }

}



export const ErrorResponse = (err: Exception, url : string, res: Response): void => {
  res.status(err.status).json({
    status: err.status,
    detail: err.message,
    url: url,
    stack: err.stack,
  });
}