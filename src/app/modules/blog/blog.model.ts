import mongoose, { Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'title is require'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'blog image is required'],
    },
    description: {
      type: String,
      required: [true, 'blog image is required'],
    },
    tags: {
      type: String,
    },
    category: {
      type: String,
    },
    duration: {
      type: String,
    },
    price: {
      type: Number,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
