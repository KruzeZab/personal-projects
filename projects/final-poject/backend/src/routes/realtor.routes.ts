import { Router } from 'express';
import { validateReqBody } from '../middleware/validator';
import { getLoginSchema, getRealtorSignupSchema } from '../schema';
import RealtorController from '../controller/Realtor.controller';

const router = Router();

router.post(
  '/signup',
  validateReqBody(getRealtorSignupSchema, false),
  RealtorController.signup,
);

router.post(
  '/login',
  validateReqBody(getLoginSchema, false),
  RealtorController.login,
);

router.get('/', RealtorController.getAll);
router.get('/:id', RealtorController.get);

export default router;
