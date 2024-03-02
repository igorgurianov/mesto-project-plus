import { NextFunction } from 'express';

export interface IError extends Error {
  statusCode: number
}

class InvalidDataError extends Error {
  statusCode: number;

  constructor(message: string = 'Неверный формат запроса') {
    super(message);
    this.statusCode = 400;
  }
}

export const dataValidation = (data: string, next: NextFunction, errorText?:string) => {
  if (data.length !== 24) {
    const err = new InvalidDataError(errorText);
    next(err);
    return false;
  } return true;
};
