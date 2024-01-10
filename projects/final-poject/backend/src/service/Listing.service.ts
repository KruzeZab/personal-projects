import { BadRequestError } from '../error';
import { buildMeta, getPaginationOptions } from '../util/pagination';
import Listing from '../model/Listing.model';
import {
  GetAllListingQuery,
  GetSearchListingQuery,
  IListing,
} from '../interface/listing';
import Photo from '../model/Photo.model';
import Realtor from '../model/Realtor.model';

class ListingService {
  static async create(body: IListing) {
    try {
      // Create Photos from photo array
      const listingPhotos: Photo[] = [];

      const realtor = await Realtor.findOneBy({ id: body.realtorId });

      if (!realtor) {
        throw new BadRequestError('Realtor not found with the given id');
      }

      // Create Listing
      const listing = Listing.create({
        ...body,
        photos: [],
        realtor,
      });

      // Save the listing to the database
      await listing.save();

      await Promise.all(
        body.photos.map(async (photoUrl) => {
          const newPhoto = Photo.create({
            src: photoUrl,
            alt: 'Photo description',
          });
          newPhoto.listing = listing;
          await newPhoto.save();
          listingPhotos.push(newPhoto);
        }),
      );
      listing.photos = listingPhotos;

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
      const listings = await Listing.createQueryBuilder('listing')
        .offset(offset)
        .limit(limit)
        .getMany();

      const total = await Listing.count();

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

  static async search(query: GetSearchListingQuery) {
    const { page, size, title, city, state } = query;

    // Calculate skip and limit based on page and size
    const { limit, offset } = getPaginationOptions({ page, size });

    try {
      // Query the database with skip and limit
      const listings = Listing.createQueryBuilder('listing')
        .offset(offset)
        .limit(limit);

      if (title) {
        listings.andWhere('listing.name ILIKE :title', {
          title: `%${title}%`,
        });
      }

      if (city) {
        listings.andWhere('listing.name ILIKE :city', {
          city: `%${city}%`,
        });
      }

      if (state) {
        listings.andWhere('listing.state = :state', {
          state,
        });
      }

      const total = await Listing.count();

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
