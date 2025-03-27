import { Router } from 'express';
import auth from '../../../../middlewares/auth';
import { adminMetaControllers } from './adminMeta.controller';

const router = Router();
router.get('/', auth('admin'), adminMetaControllers.handleGetAdminMetaData);

export const adminMetaRoutes = router;
