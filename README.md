> [!IMPORTANT]
> # Custom Functions
> ### Config
```javascript
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL as string,
  defaultPassword: process.env.defaultPassword,
  saltround: process.env.SALT_ROUND,
  jwt_secret: process.env.jwt_secret,
};

```
> ### Server
```javascript
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
// for asynchronous  behavior
process.on('unhandledRejection', () => {
  console.log(`UnhandledRejection is detected, shutting down server....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//  for synchronous behavior
process.on('uncaughtRejection', () => {
  console.log(`UnCaughtRejection is detected, shutting down server....`);
  process.exit(1);
});

```
> ### App
``` javascript
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalError from './app/middlewares/globalError';
import cookieParser from 'cookie-parser';
const app: Application = express();
//parsers
app.use(express.json());
app.use(
  cors({
    origin: [''],
  }),
);
app.use(cookieParser());
app.use('/api/v1', router);
const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);
app.use(globalError);
app.use(notFound);
export default app;

```
## <font color="red">UTILS!</font> 
> ### For Response
``` javascript
import { Response } from 'express';
type Tdata<T> = {
  success: boolean;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, result: Tdata<T>) => {
  return res.status(200).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
};
```
  
>### CatchAsync()
```javascript
import { NextFunction, RequestHandler, Request, Response } from 'express';

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

```

## Middlewares
> ### globalError
```javascript

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';

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
```
> ### notFound
```javascript
import { Request, Response } from 'express';
const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'API not found',
  });
};
export default notFound;
```
> ### validations
``` javascript
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
export const validation = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};
```
## Errors
> ### AppError
```javascript
class AppError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;

```

