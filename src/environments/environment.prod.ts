import {LogLevel} from '../app/services/shared/LogLevel';

export const environment = {
  production: true,
  baseAPIUrl: 'https://murcy-api.herokuapp.com/',
  logger: {
    level: LogLevel.Error,
    printDate: true
  }
};
