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
