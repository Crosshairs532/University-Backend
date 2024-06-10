import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map((val) => {
    return {
      path: val.name,
      message: val.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation Error',
    errorSource,
  };
};

// mongoose.Error.ValidationError | mongoose.Error.CastError
