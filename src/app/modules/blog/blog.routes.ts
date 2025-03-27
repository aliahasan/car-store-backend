import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogControllers } from './blog.controller';
import { blogsValidations } from './blog.validation';

const router = Router();

router.post(
  '/create',
  auth('admin'),
  validateRequest(blogsValidations.createBlogSchema),
  blogControllers.handleCreateBlog
);
router.get('/blog', blogControllers.handleGetAllBlogs);
router.get('/:blogId', blogControllers.handleGetBlogById);
router.patch(
  '/:blogId',
  auth('admin'),
  validateRequest(blogsValidations.updateBlogSchema),
  blogControllers.handleUpdateBlog
);
router.delete('/:blogId', auth('admin'), blogControllers.handleDeleteBlog);

export const blogRoutes = router;
