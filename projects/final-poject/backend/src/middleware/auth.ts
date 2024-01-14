import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

import config from '../config';
import { UnauthenticatedError } from '../error';

// eslint-disable-next-line
export const auth = async (req: any, res: Response, next: NextFunction) => {
  // { authorization: "Bearer <token>"}
  const token = req.headers.authorization?.split(' ')[1] as string;

  if (!token) {
    throw new UnauthenticatedError('User must be authenticated');
  }

  const decode = jwt.verify(
    token,
    config.jwt.accessTokenSecret!,
  ) as jwt.JwtPayload;

  req.user = decode;

  next();
};
