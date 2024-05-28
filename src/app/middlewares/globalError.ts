/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
const globalError = (
  err: any,
  req: Request,
  res: Response,

  next: NextFunction,
) => {
  return res.status(500).json({ success: false, message: err });
};

export default globalError;
