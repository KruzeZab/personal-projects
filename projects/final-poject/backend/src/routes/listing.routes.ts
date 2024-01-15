import { Router } from 'express';
import ListingController from '../controller/Listing.controller';
import { validateReqBody } from '../middleware/validator';
import { getListingSchema } from '../schema/listing.schema';

const router = Router();

router.post(
  '/create',
  validateReqBody(getListingSchema, false),
  ListingController.create,
);

router.get('/search', ListingController.search);
router.post('/:id/delete', ListingController.delete);

router.get('/:id', ListingController.get);
router.get('/', ListingController.getAll);

export default router;
