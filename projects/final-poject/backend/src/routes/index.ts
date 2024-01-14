import { Router } from 'express';

import realtorRoutes from './realtor.routes';
import listingRoutes from './listing.routes';

const router = Router();

router.use('/realtors', realtorRoutes);
router.use('/listings', listingRoutes);

export default router;
