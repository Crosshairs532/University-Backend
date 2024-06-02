import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interfaceErrros/error';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSource: TErrorSource = [{ path: err.path, message: err.message }];
  return {
    statusCode,
    message: 'Invalid Id',
    errorSource,
  };
};
