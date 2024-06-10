/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { handleZodError } from '../errrors/handleZodError';
import { handleValidationError } from '../errrors/handleValidationError';
import { TErrorSource } from '../interface/error';
import { handleCastError } from '../errrors/handleCastError';
import { handleDuplicateError } from '../errrors/handleDuplicateError';
import AppError from '../errrors/appError';
const globalError: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR || 500;
  let message = err.message || 'Something went Wrong';

  // module 14
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // module 14
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err.name === 'castError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message: err || message,
    errorSource,
    stack: config.node_env == 'development' ? err.stack : null,
  });
};

export default globalError;

/*
  \  pattern | 


  success
  message
  errorSources:[
    path:""
,
    message:''
  ]
  stack
*/
