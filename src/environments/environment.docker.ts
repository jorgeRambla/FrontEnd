import {LogLevel} from '../app/services/shared/LogLevel';

export const environment = {
  production: true,
  testEnvironment: false,
  baseAPIUrl: 'localhost:8090/api/',
  logger: {
    level: LogLevel.Error,
    printDate: true
  }
};
