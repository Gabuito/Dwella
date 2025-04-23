import type { Response } from "express"

type StatusCode = 400 | 401 | 403 | 404 | 405 | 409 | 422 | 429 | 500 | 503;

type WrapperMessage = {
  [key in StatusCode]: {
    title: string;
    code: string;
    status: number;
    detail: string;
  }
};

const wrapper_message: WrapperMessage = {
  400: {
    title: "Bad Request",
    code: "BAD_REQUEST",
    status: 400,
    detail: "The request could not be understood by the server due to malformed syntax.",
  },
  401: {
    title: "Unauthorized",
    code: "UNAUTHORIZED",
    status: 401,
    detail: "The request requires user authentication.",
  },
  403: {
    title: "Forbidden",
    code: "FORBIDDEN",
    status: 403,
    detail: "The server understood the request, but refuses to authorize it.",
  },
  404: {
    title: "Not Found",
    code: "NOT_FOUND",
    status: 404,
    detail: "The server has not found anything matching the request URI.",
  },
  405: {
    title: "Method Not Allowed",
    code: "METHOD_NOT_ALLOWED",
    status: 405,
    detail: "The method specified in the request is not allowed for the resource identified by the request URI.",
  },
  409: {
    title: "Conflict",
    code: "CONFLICT",
    status: 409,
    detail: "The request could not be completed due to a conflict with the current state of the resource.",
  },
  422: {
    title: "Unprocessable Entity",
    code: "UNPROCESSABLE_ENTITY",
    status: 422,
    detail: "The server understands the content type of the request entity, but was unable to process the contained instructions.",
  },
  429: {
    title: "Too Many Requests",
    code: "TOO_MANY_REQUESTS",
    status: 429,
    detail: "The user has sent too many requests in a given amount of time.",
  },
  500: {
    title: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    status: 500,
    detail: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  },
  503: {
    title: "Service Unavailable",
    code: "SERVICE_UNAVAILABLE",
    status: 503,
    detail: "The server is currently unable to handle the request due to temporary overloading or maintenance of the server.",
  }
};

export const errorResponse = (res: Response, status: number, url: string, value?: string[]) => {
  res.status(status).json({
    title: wrapper_message[status as StatusCode].title,
    code: wrapper_message[status as StatusCode].code,
    status: wrapper_message[status as StatusCode].status,
    detail: value && value.length > 0
      ? wrapper_message[status as StatusCode].detail + ": " + value.join(", ")
      : wrapper_message[status as StatusCode].detail,
    instance: url,
    timestamp: new Date().toLocaleDateString(res.req.headers["accept-language"] || "en-US", { timeZone: "america/sao_paulo" })
  });

}


