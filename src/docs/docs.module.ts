import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@greatminds/dp-nestjs-configuration-lib';
import { LoggerModule } from '@greatminds/dp-nestjs-logger-lib';
import { HealthController } from '../health/controllers/health.controller';
import { autoMockProvider } from './helpers/mocks.helper';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      useEnvironmental: true,
    }),
    LoggerModule.forRoot(),
  ],
  providers: [
    ...autoMockProvider([
      'HealthCheckService',
      'ServerIndicator',
      'SystemCPUIndicator',
      'EventLoopIndicator',
      'HeapUsedIndicator',
    ]),
  ],
  controllers: [HealthController],
})
export class DocsModule {}
