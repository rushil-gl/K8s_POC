import { NestLoggerOptions } from '@greatminds/dp-nestjs-logger-lib';

export class LoggerConfiguration {
  public static getLoggerOptions(isProduction: boolean): NestLoggerOptions {
    return {
      loggerOptions: {
        useSimpleFormat: !isProduction,
        level: isProduction ? 'info' : 'debug',
      },
    };
  }
}
