import { BadRequestError } from '../error';
import { buildMeta, getPaginationOptions } from '../util/pagination';
import Listing from '../model/Listing.model';
import {
  GetAllListingQuery,
  GetSearchListingQuery,
  IListing,
} from '../interface/listing';
import Realtor from '../model/Realtor.model';
import { Like } from 'typeorm';

class ListingService {
  static async create(body: IListing) {
    try {
      const realtor = await Realtor.findOneBy({ id: body.realtorId });

      if (!realtor) {
        throw new BadRequestError('Realtor not found with the given id');
      }

      // Create Listing
      const listing = Listing.create({
        ...body,
        realtor,
      });

      // Save the listing to the database
      await listing.save();

      return {
        data: listing,
        message: 'Listing created successfully!',
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async getAll(query: GetAllListingQuery) {
    const { page, size } = query;

    // Calculate skip and limit based on page and size
    const { limit, offset } = getPaginationOptions({ page, size });

    try {
      // Query the database with skip and limit
      const [listings, total] = await Listing.createQueryBuilder('listing')
        .offset(offset)
        .limit(limit)
        .getManyAndCount();

      const meta = buildMeta(total, size, page);

      return {
        data: listings,
        meta,
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }

  static async getById(listingId: number) {
    try {
      const listing = await Listing.findOneBy({ id: listingId });
      if (!listing) {
        throw new BadRequestError('listing not found');
      }
      return listing;
    } catch (error) {
      throw new BadRequestError('Error fetching listing: ' + error);
    }
  }

  static async delete(listingId: number) {
    try {
      const listing = await Listing.findOneBy({ id: listingId });

      if (!listing) {
        throw new BadRequestError('Listing not found');
      }

      await Listing.remove(listing);

      return {
        message: 'Listing deleted successfully!',
      };
    } catch (error) {
      throw new BadRequestError('Error deleting listing: ' + error);
    }
  }

  static async search(query: GetSearchListingQuery) {
    const { page, size, title, city, state } = query;

    // Calculate skip and limit based on page and size
    const { limit, offset } = getPaginationOptions({ page, size });

    try {
      // Start building the query with offset and limit

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const whereClause: any = {};
      if (title !== '') {
        whereClause.title = Like(`%${title}%`);
      }
      if (state !== '') {
        whereClause.state = state;
      }
      if (city !== '') {
        whereClause.city = Like(`%${city}%`);
      }

      const [listings, total] = await Listing.findAndCount({
        where: whereClause,
        take: limit,
        skip: offset,
      });

      // Build meta information for pagination
      const meta = buildMeta(total, size, page);

      return {
        data: listings,
        meta,
      };
    } catch (error) {
      throw new BadRequestError(error + '');
    }
  }
}

export default ListingService;
