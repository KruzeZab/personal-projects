import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import {
  GetAllRealtorsQuery,
  GetSearchRealtorsQuery,
  IRealtorSignup,
} from '../interface/realtor';
import RealtorService from '../service/Realtor.service';
import { ILogin } from '../interface/auth';
import { BadRequestError } from '../error';

class RealtorController {
  /**
   * create a new realtor
   *
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns response
   */
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body: IRealtorSignup = req.body;
      const { message, data } = await RealtorService.signup(body);
      return res.status(HttpStatus.CREATED).json({
        message,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * login realtor
   *
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns response
   */
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body: ILogin = req.body;

      const data = await RealtorService.login(body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * get all realtors
   *
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns response
   */
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query;
    try {
      const data = await RealtorService.getAll(
        query as unknown as GetAllRealtorsQuery,
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * get a single realtor
   *
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns response
   */
  static async get(req: Request, res: Response, next: NextFunction) {
    const realtorId = Number(req.params.id);
    try {
      const data = await RealtorService.getById(realtorId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * search for realtor
   *
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns response
   */
  static async search(req: Request, res: Response, next: NextFunction) {
    const query = req.query;

    try {
      const data = await RealtorService.search(
        query as unknown as GetSearchRealtorsQuery,
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * get user info from token
   *
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns response
   */
  static async getUserInfoFromToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];

      if (!accessToken) {
        throw new BadRequestError('Access token not provided');
      }

      const userInfo = await RealtorService.getUserInfoFromToken(accessToken);
      res.json(userInfo);
    } catch (error) {
      next(error);
    }
  }

  /**
   * refrehs the token
   *
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns response
   */
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Refresh token is missing' });
    }
    try {
      const accessToken = await RealtorService.refreshToken(refreshToken);
      return res
        .status(HttpStatus.ACCEPTED)
        .json({ success: true, accessToken });
    } catch (error) {
      next(error);
    }
  }
}

export default RealtorController;
