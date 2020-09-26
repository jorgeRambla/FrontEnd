import {LogLevel} from '../app/services/shared/LogLevel';

export const environment = {
  production: true,
  testEnvironment: false,
  baseAPIUrl: 'https://murcy-api.herokuapp.com/api/',
  logger: {
    level: LogLevel.Error,
    printDate: true
  }
};
