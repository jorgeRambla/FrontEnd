import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import {LogLevel} from './LogLevel';

export class LogEntry {

  entryDate: Date = new Date();
  message: string;
  level: LogLevel = LogLevel.Debug;
  optionalData: any[] = [];
  logWithDate = true;
  private datePipe: DatePipe;


  constructor(message: string, level?: LogLevel, optionalData?: any[], logWithDate?: boolean) {
    this.datePipe = new DatePipe('en-US');
    this.message = message;
    this.level = level;
    this.optionalData = optionalData;
    this.logWithDate = logWithDate;
  }

  static formatOptionalData(data: any[]): string {
    let ret: string = data.join(',');

    if (data.some(item => typeof item === 'object')) {
      ret = '';
      for (const dataItem of data) {
        ret += JSON.stringify(dataItem).concat(',');
      }
    }
    return ret;
  }


  buildLogString(): string {
    let displayInfo = '';

    if (this.logWithDate) {
      displayInfo = this.datePipe.transform(this.entryDate, 'yyyy-MM-dd HH:mm:ss.SSS').concat(' - ');
    }

    displayInfo = displayInfo.concat('[').concat(LogLevel[this.level]).concat('] - ');

    displayInfo = displayInfo.concat(this.message);

    if (this.optionalData.length) {
      displayInfo = displayInfo.concat(' - ').concat(LogEntry.formatOptionalData(this.optionalData));
    }
    return displayInfo;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logOptions = environment.logger;


  public debug(message: string, ...optionalData: any[]) {
    this.log(message, LogLevel.Debug, optionalData);
  }

  public info(message: string, ...optionalData: any[]) {
    this.log(message, LogLevel.Info, optionalData);
  }

  public warn(message: string, ...optionalData: any[]) {
    this.log(message, LogLevel.Warn, optionalData);
  }

  public error(message: string, ...optionalData: any[]) {
    this.log(message, LogLevel.Error, optionalData);
  }

  public fatal(message: string, ...optionalData: any[]) {
    this.log(message, LogLevel.Fatal, optionalData);
  }

  private log(message: string, level: LogLevel, ...optionalData: any[]) {
    if (this.shouldLog(level)) {
      const logEntry: LogEntry = new LogEntry(message, level, optionalData, this.logOptions.printDate);

      console.log(logEntry.buildLogString());
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let shouldLog = false;
    if ((this.logOptions.level === LogLevel.All) ||
      (level >= this.logOptions.level && level !== LogLevel.Off)) {
        shouldLog = true;
    }
    return shouldLog;
  }
}
