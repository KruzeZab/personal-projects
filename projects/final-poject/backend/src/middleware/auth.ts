import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

import config from '../config';
import { NoPermissionError, UnauthenticatedError } from '../error';
import { Roles } from '../interface/auth';

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

export const checkRole =
  // eslint-disable-next-line
  (requiredRole: string) => (req: any, res: Response, next: NextFunction) => {
    const userRole = req.user ? req.user.role : Roles.USER;

    if (userRole === requiredRole) {
      next();
    } else {
      next(new NoPermissionError('Insufficient permissions'));
    }
  };
