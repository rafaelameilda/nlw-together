import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  const [, token] = authToken.split(" ");

  if (!token) {
    return response.status(401).end();
  }

  try {
    const { sub } = verify(token, "rafaelalmeidalara") as IPayload;

    request.user_id = sub;
  } catch (error) {
    return response.status(401).end();
  }

  return next();
}
