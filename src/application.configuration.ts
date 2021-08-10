import { Injectable } from '@nestjs/common';
import {
  ConfigurationOptions,
  ConfigurationService,
} from '@greatminds/dp-configuration-lib';
import { NestLoggerOptions } from '@greatminds/dp-nestjs-logger-lib';
import { Configurable } from '@greatminds/dp-nestjs-configuration-lib';

/**
 * It encapsulates the application configuration properties.
 * Properties related to the application initialization.
 *
 * @author javier.perez
 */
@Injectable()
export class ApplicationConfiguration {
  public static getLoggerOptions(): NestLoggerOptions {
    return {
      loggerOptions: {
        useSimpleFormat: process.env.NODE_ENV === 'production' ? false : true,
        level: process.env.DP_ENV === 'production' ? 'info' : 'debug',
      },
    };
  }
  public static getConfigurationOptions(): ConfigurationOptions {
    return {
      secretsManagerSecretIds: process.env.AWS_SECRET_ID,
      useEnvironmental: true,
    };
  }

  constructor(
    @Configurable() private readonly configuration: ConfigurationService,
  ) {}

  get port(): number {
    const port = this.configuration.get('PORT');
    return port ? +port : 3000;
  }
}
