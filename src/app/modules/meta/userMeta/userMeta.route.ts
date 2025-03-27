import { Router } from 'express';
import auth from '../../../middlewares/auth';
import { userMetaControllers } from './userMeta.controller';

const router = Router();
router.get('/', auth('user'), userMetaControllers.handleGetUserMetaData);
export const userMetaRoutes = router;
