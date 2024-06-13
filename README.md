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
export default app;

```
> ### 
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
