import { Router } from 'express';
import { auth } from '../middleware/auth';

import userRoutes from './user.routes';
import realtorRoutes from './realtor.routes';
import listingRoutes from './listing.routes';
import contactRoutes from './contact.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/realtors', realtorRoutes);
router.use('/listings', listingRoutes);
router.use('/contacts', auth, contactRoutes);

export default router;
