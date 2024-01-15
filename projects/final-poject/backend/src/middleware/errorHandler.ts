import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { UnauthenticatedError, BadRequestError, NotFoundError } from '../error';

import loggerWithNameSpace from '../util/logger';

const logger = loggerWithNameSpace('ErrorHandler');

/**
 * Handle generic errors
 * ( defined in custom error class )
 *
 */
export function genericErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line
) {
  if (err.stack) {
    logger.error(err.stack);
  }

  if (err instanceof BadRequestError) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
  }

  if (err instanceof UnauthenticatedError) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(HttpStatus.NOT_FOUND).json({
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    });
  }

  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
}
