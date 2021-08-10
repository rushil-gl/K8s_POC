import {Module, OnApplicationShutdown} from '@nestjs/common';
import { dpEnvironment } from '@greatminds/dp-configuration-lib';
import { LoggerServiceFactory } from '@greatminds/dp-logger-lib';
import { LoggerModule } from '@greatminds/dp-nestjs-logger-lib';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { AppConfiguration } from './configuration/app.configuration';
import { HealthModule } from './health';
import {SquareModule} from './square/health.module';

const isProduction = process.env.NODE_ENV === 'production';
const loggerService = LoggerServiceFactory.createLoggerService({
  useSimpleFormat: !isProduction,
});

@Module({
  imports: [
    ConfigurationModule.forRoot(
      {
        secretsManagerSecretIds: isProduction
          ? [
              {
                id: `${dpEnvironment()}-dp-template`, // replace this with your application secret manager key
                path: `template`, // this is the key for the loaded information
              },
            ]
          : undefined,
        useEnvironmental: !isProduction,
      },
      loggerService,
    ),
    LoggerModule.forRoot({ useValue: loggerService }),
    HealthModule,
    SquareModule,
  ],
  controllers: [],
  providers: [AppConfiguration],
})
export class AppModule implements OnApplicationShutdown{
    async onApplicationShutdown(signal?: string) {
      console.log(`Received shutdown signal ${signal}, delay shutdown 2 secs`);
      
      await new Promise(res => setTimeout(res, 2000));

      console.log('Delayed successful, continue shutdown');
    }
}
