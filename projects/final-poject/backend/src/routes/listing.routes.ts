import { Router } from 'express';
import ListingController from '../controller/Listing.controller';
import { validateReqBody } from '../middleware/validator';
import { getListingSchema } from '../schema/listing.schema';
import { checkRole } from '../middleware/auth';
import { Roles } from '../interface/auth';

const router = Router();

router.post(
  '/create',
  checkRole(Roles.REALTOR),
  validateReqBody(getListingSchema, false),
  ListingController.create,
);

router.get('/', ListingController.getAll);
router.get('/:id', ListingController.get);

export default router;
