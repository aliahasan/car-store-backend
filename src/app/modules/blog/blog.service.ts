import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import Blog from './blog.model';

export const createBlog = async (payload: IBlog, authorId: string) => {
  const blog = new Blog({
    ...payload,
    author: authorId,
  });
  const newBlog = await blog.save();
  return newBlog;
};

export const getAllBlogs = async (query: Record<string, unknown>) => {
  const carsQuery = new QueryBuilder(
    Blog.find().populate('author', 'name image'),
    query
  )
    .search(['title', 'description', 'tags'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await carsQuery.countTotal();
  const result = await carsQuery.queryModel;
  return {
    meta,
    result,
  };
};

export const getBlogById = async (id: string) => {
  const blog = await Blog.findById(id).populate('author', 'name email');
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

export const updateBlog = async (
  id: string,
  userId: string,
  updateData: Partial<IBlog>
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  if (blog.author.toString() !== userId) {
    throw new Error('Unauthorized to update this blog');
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedBlog;
};

export const deleteBlog = async (id: string, userId: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  if (blog.author.toString() !== userId) {
    throw new Error('Unauthorized to delete this blog');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const blogServices = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
