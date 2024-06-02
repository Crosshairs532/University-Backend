import { TErrorSource, TGenericErrorResponse } from '../interfaceErrros/error';

export const handleError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extracted_msg = match && match[1];
  const errorSource: TErrorSource = [
    { path: '', message: ` ${extracted_msg} is already exists ` },
  ];
  return {
    statusCode,
    message: 'Duplicated Error',
    errorSource,
  };
};
