import { Router } from 'express';
import userRoutes from './user.routes';
import realtorRoutes from './realtor.routes';
import listingRoutes from './listing.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/realtors', realtorRoutes);
router.use('/listings', listingRoutes);

export default router;
