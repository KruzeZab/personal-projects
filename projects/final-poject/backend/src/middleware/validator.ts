import { Schema } from 'joi';

import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../error/BadRequestError';

export function validateReqQuery(schema: Schema, abortEarly: boolean = true) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, { abortEarly });

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.query = value;

    next();
  };
}

export function validateReqBody(schema: Schema, abortEarly: boolean = true) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly });

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.query = value;

    next();
  };
}
