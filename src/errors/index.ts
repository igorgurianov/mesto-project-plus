import mongoose from 'mongoose';

import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../utils/responseCodes';

export interface IError extends Error {
    statusCode: number
    errText: string
  }

const errorHandler = (err: IError) => {
  let statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;

  let { message } = err;

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    statusCode = HTTP_STATUS_NOT_FOUND;
    message = 'Такой карточки нет';
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = HTTP_STATUS_BAD_REQUEST;
    message = 'Передан неверный ID';
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS_BAD_REQUEST;
    message = 'Данные не соответствуют схеме';
  }

  return { statusCode, message };
};

export default errorHandler;
