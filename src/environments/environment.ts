import {LogLevel} from '../app/services/shared/LogLevel';

export const environment = {
  production: false,
  testEnvironment: false,
  baseAPIUrl: 'http://localhost:8080/api/',
  logger: {
    level: LogLevel.All,
    printDate: true
  }
};


import 'zone.js/dist/zone-error';  // Included with Angular CLI.
