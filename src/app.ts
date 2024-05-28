import cors from 'cors';
import express, { Application, Request, Response } from 'express';
// import { StudentRoutes } from './app/modules/student/student.route';
import router from './app/routes';
import globalError from './app/middlewares/globalError';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);
app.use(globalError);
export default app;
