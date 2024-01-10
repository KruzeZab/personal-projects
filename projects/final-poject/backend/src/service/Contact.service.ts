import { BadRequestError } from '../error';
import { GetAllContactQuery, IContact } from '../interface/contact';
import Contact from '../model/Contact.model';
import Realtor from '../model/Realtor.model';
import User from '../model/User.model';
import { buildMeta, getPaginationOptions } from '../util/pagination';

class ContactService {
  static async create(body: IContact) {
    try {
      const realtor = await Realtor.findOneBy({ id: body.realtorId });
      const user = await User.findOneBy({ id: body.userId });
      if (!realtor) {
        throw new BadRequestError('Realtor not found with the given id');
      }

      if (!user) {
        throw new BadRequestError('User not found with the given id');
      }

      const contact = await Contact.create({
        ...body,
        realtor,
        user,
      });
      contact.save();

      return {
        data: contact,
        message: 'Contact form submitted.',
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async getAll(query: GetAllContactQuery) {
    const { page, size } = query;

    const { limit, offset } = getPaginationOptions({ page, size });

    try {
      // Query the database with skip and limit
      const contacts = await Contact.createQueryBuilder('contact')
        .offset(offset)
        .limit(limit)
        .getMany();

      const total = await Contact.count();

      const meta = buildMeta(total, size, page);

      return {
        data: contacts,
        meta,
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async getUserContact(user: number, query: GetAllContactQuery) {
    const { page, size } = query;

    const { limit, offset } = getPaginationOptions({ page, size });

    try {
      // Query the database with skip, limit, and user id condition
      const contacts = await Contact.createQueryBuilder('contact')
        .where('contact.user.id = :userId', { userId: user })
        .offset(offset)
        .limit(limit)
        .getMany();

      const total = await Contact.createQueryBuilder('contact')
        .where('contact.user.id = :userId', { userId: user })
        .getCount();

      const meta = buildMeta(total, size, page);

      return {
        data: contacts,
        meta,
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }
}

export default ContactService;
