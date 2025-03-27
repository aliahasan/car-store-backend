import { Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  description: string;
  image: string;
  tags?: string;
  price?: number;
  category?: string;
  availability?: boolean;
  duration?: string;
  author: Types.ObjectId;
}
