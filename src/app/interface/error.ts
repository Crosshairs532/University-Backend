export type TErrorSource = {
  // module 14
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSource: TErrorSource;
};
