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

router.get('/detail', RealtorController.getUserInfoFromToken);
router.get('/', RealtorController.getAll);
router.get('/search', RealtorController.search);
router.get('/refresh', RealtorController.refreshToken);
router.get('/:id', RealtorController.get);

export default router;
