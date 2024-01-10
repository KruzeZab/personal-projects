import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { GetAllContactQuery, IContact } from '../interface/contact';
import ContactService from '../service/Contact.service';

class ContactController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: IContact = req.body;
      const { message, data } = await ContactService.create(body);
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

    try {
      const data = await ContactService.getAll(
        query as unknown as GetAllContactQuery,
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // eslint-disable-next-line
  static async getUserContact(req: any, res: Response, next: NextFunction) {
    const query = req.query;
    const user = req.user;

    try {
      const data = await ContactService.getUserContact(
        user.id,
        query as unknown as GetAllContactQuery,
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default ContactController;
