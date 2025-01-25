import mongoose from 'mongoose';
import { TError, TGenericError } from '../interface/error';

const handleMongooseError = (
  err: mongoose.Error.ValidationError
): TGenericError => {
  const statusCode = 400;
  const error: TError = Object.values(err?.errors)?.map((value) => ({
    field: value?.path,
    message: value?.message,
  }));
  return {
    statusCode,
    message: 'mongoose Validation error',
    error,
  };
};
export default handleMongooseError;
