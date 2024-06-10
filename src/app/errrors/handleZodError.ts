/* eslint-disable prefer-const */
import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';
// module 14

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  let statusCode = 400;
  let errorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSource,
  };
};
