import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import tryCatchAsync from '../../utils/tryCatchAsync';
import { blogServices } from './blog.service';

const handleCreateBlog = tryCatchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await blogServices.createBlog(req.body, userId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const handleGetAllBlogs = tryCatchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Services are retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

const handleGetBlogById = tryCatchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await blogServices.getBlogById(blogId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const handleUpdateBlog = tryCatchAsync(async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.user;
  const result = await blogServices.updateBlog(blogId, userId, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const handleDeleteBlog = tryCatchAsync(async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.user;
  const result = await blogServices.deleteBlog(blogId, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const blogControllers = {
  handleCreateBlog,
  handleGetAllBlogs,
  handleGetBlogById,
  handleUpdateBlog,
  handleDeleteBlog,
};
