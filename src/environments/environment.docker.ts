import {LogLevel} from '../app/services/shared/LogLevel';

export const environment = {
  production: true,
  baseAPIUrl: 'localhost:8080/api/',
  logger: {
    level: LogLevel.Error,
    printDate: true
  }
};
