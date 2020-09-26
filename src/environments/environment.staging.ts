import {LogLevel} from '../app/services/shared/LogLevel';

export const environment = {
  production: true,
  testEnvironment: true,
  baseAPIUrl: 'https://pre-murcy-api.herokuapp.com/api/',
  logger: {
    level: LogLevel.Error,
    printDate: true
  }
};
