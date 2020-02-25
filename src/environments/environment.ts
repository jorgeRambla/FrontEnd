import {LogLevel} from '../app/services/shared/LogLevel';

export const environment = {
  production: false,
  baseAPIUrl: 'http://localhost:8090/api/',
  //baseAPIUrl: 'https://unizar-30248-2019-murcy.herokuapp.com/api/',
  logger: {
    level: LogLevel.All,
    printDate: true
  }
};


import 'zone.js/dist/zone-error';  // Included with Angular CLI.
