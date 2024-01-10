import { Router } from 'express';
import { validateReqBody } from '../middleware/validator';
import { getContactSignupSchema } from '../schema/contact.schema';
import ContactController from '../controller/Contact.controller';

const router = Router();

router.post(
  '/create',
  validateReqBody(getContactSignupSchema, false),
  ContactController.create,
);

router.get('/', ContactController.getUserContact);

export default router;
