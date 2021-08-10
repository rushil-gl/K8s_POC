import { LoggerConfiguration } from './logger.configuration';

describe('LoggerConfiguration', () => {
  describe('getLoggerOptions', () => {
    it('should return options for prod', async () => {
      const options = LoggerConfiguration.getLoggerOptions(true);
      expect(options).toMatchObject({
        loggerOptions: {
          useSimpleFormat: false,
          level: 'info',
        },
      });
    });
    it('should return options for non production envs', async () => {
      const options = LoggerConfiguration.getLoggerOptions(false);
      expect(options).toMatchObject({
        loggerOptions: {
          useSimpleFormat: true,
          level: 'debug',
        },
      });
    });
  });
});
