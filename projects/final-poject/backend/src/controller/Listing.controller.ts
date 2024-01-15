import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import ListingService from '../service/Listing.service';
import {
  GetAllListingQuery,
  GetSearchListingQuery,
  IListing,
} from '../interface/listing';

class ListingController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: IListing = req.body;
      const { message, data } = await ListingService.create(body);
      return res.status(HttpStatus.CREATED).json({
        message,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query;
    console.log(query);
    try {
      const data = await ListingService.getAll(
        query as unknown as GetAllListingQuery,
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    const realtorId = Number(req.params.id);
    try {
      const data = await ListingService.getById(realtorId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    const query = req.query;

    try {
      const data = await ListingService.search(
        query as unknown as GetSearchListingQuery,
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    try {
      const data = await ListingService.delete(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default ListingController;
